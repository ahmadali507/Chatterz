'use client'
import { motion, useAnimation,  } from 'framer-motion'
import {
  MessageCircle,
  Zap,
  Shield,
  Smartphone,
  Video,
  FileText,
  Users,
  Star,
} from 'lucide-react'
import { useEffect } from 'react';


const Choose = () => {
    const controls = useAnimation(); 
    useEffect(() => {
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      })
    }, [controls])
  
  return (
    <div>
        
        <section id="features" className="py-16 px-4 md:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Why Choose Chatterz?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { icon: <Zap className="w-12 h-12 text-yellow-400" />, title: "Real-time Messaging", description: "Instant message delivery for smooth conversations." },
            { icon: <Video className="w-12 h-12 text-green-400" />, title: "Video Conferencing", description: "Crystal-clear video calls with screen sharing." },
            { icon: <FileText className="w-12 h-12 text-purple-400" />, title: "File Sharing", description: "Easily share and collaborate on documents." },
            { icon: <Users className="w-12 h-12 text-pink-400" />, title: "Team Channels", description: "Organize discussions by topics or projects." },
            { icon: <Shield className="w-12 h-12 text-red-400" />, title: "Enhanced Security", description: "End-to-end encryption for all your communications." },
            { icon: <Smartphone className="w-12 h-12 text-blue-400" />, title: "Cross-Platform", description: "Access Chatterz from any device, anywhere." },
            { icon: <Star className="w-12 h-12 text-amber-400" />, title: "Rich Media Support", description: "Share GIFs, emojis, and stickers in your chats." },
            { icon: <MessageCircle className="w-12 h-12 text-indigo-400" />, title: "Thread Replies", description: "Keep conversations organized with threaded messages." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg text-center border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            >
              <motion.div
                animate={controls}
                className="flex justify-center mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Choose
