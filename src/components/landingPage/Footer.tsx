import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FooterItems } from '@/config/config'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900/50 backdrop-blur-md text-gray-400 py-12 px-4 md:px-8 border-t border-purple-500/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Chatterz
              </span>
            </div>
            <p>Empowering teams with seamless communication and collaboration.</p>
          </div>
          {FooterItems.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2023 Chatterz. All rights reserved.</p>
        </div>
      </footer>
 
    </div>
  )
}

export default Footer
