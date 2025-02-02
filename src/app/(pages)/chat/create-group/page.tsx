'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Users, MessageCircle } from 'lucide-react'

interface Friend {
  id: string
  name: string
  avatar: string
}

const friendsList: Friend[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '3', name: 'Carol Williams', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '4', name: 'David Brown', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '5', name: 'Eva Davis', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function CreateGroupChat() {
  const [groupName, setGroupName] = useState('')
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleCreateGroup = () => {
    // Here you would typically send the group creation request to your backend
    console.log('Creating group:', { name: groupName, members: selectedFriends })
    // Reset form after submission
    setGroupName('')
    setSelectedFriends([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Create a Group Chat
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-100">Group Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName" className="text-sm font-medium text-gray-300">
                    Group Name
                  </Label>
                  <Input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="mt-1 bg-gray-700/50 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">
                    Select Friends
                  </Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {friendsList.map((friend) => (
                      <div key={friend.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`friend-${friend.id}`}
                          checked={selectedFriends.includes(friend.id)}
                          onCheckedChange={() => handleFriendToggle(friend.id)}
                          className="border-gray-500 text-blue-500"
                        />
                        <Label
                          htmlFor={`friend-${friend.id}`}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-gray-300">{friend.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-5 h-5" />
                  <span>{selectedFriends.length} friends selected</span>
                </div>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!groupName || selectedFriends.length === 0}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Create Group Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}