'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { mockChat, mockContacts } from "@/config/config"; // Adjust the import according to your actual data source


type ContactType = {
    id: number;
    name: string;
    unreadMessages: number;
}
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
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

const ChatPage = () => {
  const [showChat, setShowChat] = useState(true);
  const [activeContact, setActiveContact] = useState<ContactType | null>(); // Track the active contact
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="flex h-screen min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100 overflow-hidden">
      <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 text-xl font-semibold">Contacts</div>
        <ul>
          {mockContacts.map((contact) => (
            <li
              key={contact.id}
              className="p-3 flex items-center hover:bg-gray-700 cursor-pointer"
              onClick={() => setActiveContact(contact)}
            >
              <div className="relative flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {contact.name[0]}
                </div>
                {contact.unreadMessages > 0 && (
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
                )}
              </div>
              <span className="ml-4">{contact.name}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-grow relative ">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col h-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-grow p-4 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100 flex flex-col overflow-hidden">
            {activeContact ? (
              <div className="flex flex-col space-y-4">
                {mockChat.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: message.user === "Alice" ? 20 : -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${
                      message.user === "Alice" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`max-w-xs rounded-lg p-3 ${
                        message.user === "Alice"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <p className="font-semibold">{message.user}</p>
                      <p>{message.message}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                <p>Select a contact to start chatting</p>
              </div>
            )}
          </div>
          <div className="bg-gray-800 p-4 flex items-center border-t border-gray-700">
            <Input
              placeholder="Type a message..."
              className="flex-grow bg-gray-600 border-purple-500/30"
            />
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-110 ml-2">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChatPage;
