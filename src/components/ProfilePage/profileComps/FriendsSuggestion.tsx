import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { Users } from "@/types/types";



// Static friend suggestions (mock data)
// const friendSuggestion: UserData[] = [
//   {
//     id: "1",
//     name: "Alice Johnson",
//     avatar: "/placeholder.svg?height=40&width=40",
//     mutualFriends: 5,
//   },
//   {
//     id: "2",
//     name: "Bob Smith",
//     avatar: "/placeholder.svg?height=40&width=40",
//     mutualFriends: 3,
//   },
//   {
//     id: "3",
//     name: "Carol Williams",
//     avatar: "/placeholder.svg?height=40&width=40",
//     mutualFriends: 7,
//   },
// ];

const FriendsSuggestion: React.FC = () => {
  const [friends, setFriends] = useState<Users[]>([]); // ✅ Corrected Type

  useEffect(() => {
    const getFriends = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const friendsList: Users[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            name: data.name || "Unknown",
            email: data.email || "unknown@example.com",
            uid: data.uid || "",
            mutualFriends: data.mutualFriends || 0,
          };
        });

        const display = friendsList.filter((friend) => friend.uid !== auth?.currentUser?.uid); // Remove the current user from the list
        console.log("Friends list:", display);

        setFriends(display);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    getFriends();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-100">
              Friend Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {friends.map((friend) => (
                <div key={friend.uid} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="mr-3">
                      <AvatarImage src={friend.name || "/default-avatar.png"} alt={friend.name} />
                      <AvatarFallback>{friend.username?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-100">{friend.username}</p>
                      <p className="text-sm text-gray-400">{friend.mutualFriends} mutual friends</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-400 hover:bg-blue-900/50 hover:text-blue-300"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default FriendsSuggestion;
