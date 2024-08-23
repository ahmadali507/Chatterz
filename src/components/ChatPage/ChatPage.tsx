'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Send,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Smile,
} from 'lucide-react'

// Mock data for contacts and messages
const contacts = [
  { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg', lastMessage: 'Hey, how are you?', unreadCount: 2 },
  { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg', lastMessage: 'Can we schedule a meeting?', unreadCount: 0 },
  { id: 3, name: 'Charlie Brown', avatar: '/placeholder.svg', lastMessage: 'I have sent you the files.', unreadCount: 1 },
  { id: 4, name: 'Diana Prince', avatar: '/placeholder.svg', lastMessage: 'Thanks for your help!', unreadCount: 0 },
  { id: 5, name: 'Ethan Hunt', avatar: '/placeholder.svg', lastMessage: 'Mission accomplished!', unreadCount: 3 },
]

const messages = [
  { id: 1, senderId: 1, text: 'Hey, how are you?', timestamp: '10:00 AM' },
  { id: 2, senderId: 'me', text: 'Im doing great, thanks! How about you?', timestamp: '10:02 AM' },
  { id: 3, senderId: 1, text: 'I am good too. Did you finish the project?', timestamp: '10:05 AM' },
  { id: 4, senderId: 'me', text: 'Yes, I just sent you the final version. Can you check it?', timestamp: '10:08 AM' },
  { id: 5, senderId: 1, text: 'Sure, I will take a look right away.', timestamp: '10:10 AM' },
]

type selectedContact = {
  name : string, 
  avatar : string, 
  lastMessage ?: string,
  unreadCount ?: number, 
}
export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<selectedContact | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleContactClick = (contact  : any) => {
    setSelectedContact(contact)
    setShowChat(true)
  }

  const handleBackToContacts = () => {
    setShowChat(false)
  }

    // Handle responsive behavior on screen resize
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 768) {
          setShowChat(false)
        } else {
          setShowChat(false)
        }
      }
  
      handleResize() // Set initial state based on current screen size
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      {/* Contact List */}
      <AnimatePresence initial={false}>
        {(!showChat || window.innerWidth > 768) && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/3 lg:w-1/4 border-r border-purple-500/30 bg-gray-800/50 backdrop-blur-md"
          >
            <div className="p-4 bg-gray-800/70">
              <h2 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
                Chats
              </h2>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContactClick(contact)}
                  className="p-4 border-b border-purple-500/30 cursor-pointer"
                >
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Box */}
      <AnimatePresence initial={false}>
        {(showChat || window.innerWidth > 768) && selectedContact && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full bg-gray-800/50 backdrop-blur-md"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gray-800/70 flex items-center border-b border-purple-500/30">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                onClick={handleBackToContacts}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Avatar className="w-10 h-10 mr-4">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h2 className="font-semibold">{selectedContact.name}</h2>
                <p className="text-sm text-gray-400">Online</p>
              </div>
              <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-grow p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === 'me'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-300 mt-1">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 bg-gray-800/70 border-t border-purple-500/30">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  className="flex-grow bg-gray-700 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button size="icon" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}