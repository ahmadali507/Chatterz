import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Edit2, Mail, MapPin, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "@/types/types";
import { toast } from "sonner";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicEditing, setProfilePicEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<Users | null>();
  const [userProfile, setUserProfile] = useState({
    ...currentUser,
  });

  useEffect(() => {
    // Function to handle the async getDoc
    const fetchUserDoc = async (uid: string) => {
      try {
        const userDocRef = doc(db, "users", uid); // Reference to the user's Firestore document
        const userDocSnap = await getDoc(userDocRef); // Fetch the document
        console.log(userDocSnap.data());
        if (userDocSnap.exists()) {
          setCurrentUser(userDocSnap.data() as Users);
          setUserProfile(userDocSnap.data());
          console.log(userDocSnap.data()); // Update state with the user data from Firestore
        } else {
          console.error("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDoc(user.uid); // Fetch user data if authenticated
      } else {
        setCurrentUser(null); // Clear user state if not authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  console.log(currentUser);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("User is not logged In");
    } else {
      const userUpdation = await updateDoc(
        doc(db, "users", currentUser.uid as string),
        {
          ...userProfile,
        }
      );
      const myuser = await getDoc(doc(db, "users", currentUser.uid as string));
      toast.success("User Info updated successfully");
      setCurrentUser(myuser.data() as Users);
      console.log(myuser.data());
    }
    // Here you would typically send the updated profile to your backend
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative mt-20 bg-gray-800/50 backdrop-blur-md border-purple-500/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Profile Information
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditToggle}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-300"
                    >
                      First Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={userProfile?.firstName}
                      onChange={handleInputChange}
                      className="mt-1 w-full bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-300"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userProfile?.lastName}
                      onChange={handleInputChange}
                      className="mt-1 w-full bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Username
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={userProfile?.username}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userProfile?.email}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={userProfile?.location}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={userProfile?.bio as string}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center mb-4 w-full h-28 relative">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden text-[32px] text-center text-black bg-violet-500 flex items-center justify-center">
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
               
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-100">
                    {currentUser
                      ? currentUser?.username
                      : "user not authenticated"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-100">
                    {currentUser
                      ? currentUser?.email
                      : "user not authenticated"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-100">
                    {currentUser
                      ? currentUser?.createdAt?.split("T")[0]
                      : "user not authenticated"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-100">
                    Joined{" "}
                    {currentUser
                      ? currentUser?.location
                      : "user not authenticated"}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    Bio
                  </h3>
                  <p className="text-gray-300">
                    {currentUser ? currentUser?.bio : "user not authenticated"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
