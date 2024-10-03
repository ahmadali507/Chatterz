'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User,  Mail, MapPin, Calendar, Edit2, UserPlus } from 'lucide-react'
import { auth, db } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Users } from '@/types/types'

interface FriendSuggestion {
  id: string
  name: string
  avatar: string
  mutualFriends: number
}
 


const friendSuggestions: FriendSuggestion[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', mutualFriends: 5 },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', mutualFriends: 3 },
  { id: '3', name: 'Carol Williams', avatar: '/placeholder.svg?height=40&width=40', mutualFriends: 7 },
]


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState<Users | null>(); 
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    joinDate: 'January 2023',
    bio: 'Passionate developer and tech enthusiast. Love to collaborate on innovative projects!',
  })
 
  useEffect(() => {
    // Function to handle the async getDoc
    const fetchUserDoc = async (uid: string) => {
      try {
        const userDocRef = doc(db, 'users', uid);  // Reference to the user's Firestore document
        const userDocSnap = await getDoc(userDocRef); // Fetch the document
        console.log(userDocSnap.data()); 
        if (userDocSnap.exists()) {
          setCurrentUser(userDocSnap.data() as Users); 
          console.log(userDocSnap.data()) // Update state with the user data from Firestore
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
        fetchUserDoc(user.uid);  // Fetch user data if authenticated
      } else {
        setCurrentUser(null);  // Clear user state if not authenticated
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  
  }, []); 

  console.log(currentUser); 



  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    // Here you would typically send the updated profile to your backend
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Your Profile
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-gray-100">Profile Information</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleEditToggle} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50">
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={currentUser?.username}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={currentUser?.email}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                      <Input
                        id="location"
                        name="location"
                        value={currentUser?.location}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={currentUser?.bio as string}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <Avatar>
                        <AvatarImage src={"./jpg"} className="w-44 h-44 rounded-full" alt="Profile picture" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-blue-400" />
                      <span className="text-gray-100">{currentUser ? currentUser?.username : "user not authenticated"}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-400" />
                      <span className="text-gray-100">{currentUser ? currentUser?.email : "user not authenticated"}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                      <span className="text-gray-100">{currentUser ? currentUser?.createdAt?.split('T')[0] : 'user not authenticated'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                      <span className="text-gray-100">Joined {currentUser ? currentUser?.location : 'user not authenticated'}}</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-100">Bio</h3>
                      <p className="text-gray-300">{currentUser ? currentUser?.bio : 'user not authenticated'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Friend Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friendSuggestions.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-100">{friend.name}</p>
                          <p className="text-sm text-gray-400">{friend.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-900/50 hover:text-blue-300">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-100">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="posts">
                <TabsList className="bg-gray-700/50">
                  <TabsTrigger value="posts" className="text-gray-300 data-[state=active]:text-blue-400">Recent Posts</TabsTrigger>
                  <TabsTrigger value="comments" className="text-gray-300 data-[state=active]:text-blue-400">Recent Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="mt-4">
                  <p className="text-gray-300">You haven't made any posts yet.</p>
                </TabsContent>
                <TabsContent value="comments" className="mt-4">
                  <p className="text-gray-300">You haven't made any comments yet.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}