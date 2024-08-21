import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, LogIn, MessageCircle, Send, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '../ui/input'

const FloatingParticle = ({ delay = 0 }) => {
    return (
      <motion.div
        className="absolute w-2 h-2 bg-blue-500 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, -100],
          x: [0, Math.random() * 100 - 50],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: delay,
        }}
      />
    )
  }

  const mockChat = [
    { user: 'Alice', message: 'Hey everyone! How is it going?' },
    { user: 'Bob', message: 'Hi Alice! Just working on some code. You?' },
    { user: 'Charlie', message: 'Hello! I am great, thanks for asking!' },
    { user: 'Alice', message: 'Nice! I am planning a team meetup. Any suggestions?' },
  ]

const DummyChat = () => {
  const [showChat, setShowChat] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  return (
    <div>
            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Connect and Collaborate with Chatterz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-3xl"
        >
          Experience seamless communication, real-time collaboration, and enhanced productivity with our feature-rich web chat application.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex space-x-4"
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Chatting Now
          </Button>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 w-full max-w-4xl bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-purple-500/30"
        >
          <motion.div 
            className="p-4 bg-gray-700/50 flex justify-between items-center"
            whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.3)" }}
          >
            <h3 className="text-xl font-semibold">Chatterz Web App</h3>
            <Button
              className='hover:scale-110 active:scale-110'
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ height: showChat ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
              {mockChat.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.user === 'Alice' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${
                    message.user === 'Alice' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`max-w-xs rounded-lg p-3 ${
                      message.user === 'Alice'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="font-semibold">{message.user}</p>
                    <p>{message.message}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 bg-gray-700/50 flex space-x-2">
              <Input placeholder="Type a message..." className="flex-grow bg-gray-600/50 border-purple-500/30" />
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-110"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>

    </div>
  )
}

export default DummyChat
