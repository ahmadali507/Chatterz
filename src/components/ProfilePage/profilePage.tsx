"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, MapPin, Calendar, Edit2, UserPlus } from "lucide-react";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Users } from "@/types/types";
import { toast } from "sonner";
import Image from "next/image";
import { Musa } from "../../../public/Images";
import ProfileCard from "./profileComps/ProfileCard";
import FriendsSuggestion from "./profileComps/FriendsSuggestion";
import Header from "../landingPage/Header"; // ✅ Imported Header component

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-gray-100">
      {/* ✅ Navbar at the top */}
      <Header />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col justify-between gap-y-10">
          <ProfileCard />
          <FriendsSuggestion />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-100">
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="posts">
                <TabsList className="bg-gray-700/50">
                  <TabsTrigger
                    value="posts"
                    className="text-gray-300 data-[state=active]:text-blue-400"
                  >
                    Recent Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="comments"
                    className="text-gray-300 data-[state=active]:text-blue-400"
                  >
                    Recent Comments
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="mt-4">
                  <p className="text-gray-300">You haven't made any posts yet.</p>
                </TabsContent>
                <TabsContent value="comments" className="mt-4">
                  <p className="text-gray-300">
                    You haven't made any comments yet.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
