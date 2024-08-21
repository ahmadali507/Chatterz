'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MessageCircle,
  Send,
  Zap,
  Shield,
  Smartphone,
  Video,
  FileText,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  LogIn,
  UserPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Header from '@/components/customComponents/Header'
import DummyChat from '@/components/customComponents/DummyChat'

const mockChat = [
  { user: 'Alice', message: 'Hey everyone! How is it going?' },
  { user: 'Bob', message: 'Hi Alice! Just working on some code. You?' },
  { user: 'Charlie', message: 'Hello! I am great, thanks for asking!' },
  { user: 'Alice', message: 'Nice! I am planning a team meetup. Any suggestions?' },
]

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

export default function Component() {
  const router = useRouter(); 
  const [showChat, setShowChat] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState<number|null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    })
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100 flex flex-col overflow-hidden">
      <Header/>
      <DummyChat/>
      
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

      <section id="pricing" className="py-16 px-4 md:px-8 bg-gray-800/30 backdrop-blur-md relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Basic", price: "Free", features: ["Up to 10 users", "5 GB file storage", "24/7 support"] },
            { name: "Pro", price: "$9.99/mo", features: ["Up to 100 users", "50 GB file storage", "Priority support", "Advanced analytics"] },
            { name: "Enterprise", price: "Custom", features: ["Unlimited users", "Unlimited storage", "Dedicated support", "Custom integrations"] },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167, 139, 250, 0.4)" }}
              className="bg-gradient-to-b from-gray-800/50 to-purple-900/30 backdrop-blur-md p-8 rounded-lg text-center flex flex-col border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {plan.price}
              </p>
              <ul className="text-left mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="flex items-center mb-2"
                  >
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <Button
                size="lg"
                className= "bg-gradient-to-r hover:scale-110 active: scale-110 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-70"
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="py-16 px-4 md:px-8 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Sarah L.", role: "Project Manager", quote: "Chatterz has revolutionized our team communication. It's intuitive and packed with features!" },
            { name: "Mike R.", role: "Software Developer", quote: "The code snippet sharing and inline code highlighting in Chatterz are game-changers for our dev team." },
            { name: "Emily T.", role: "Marketing Director", quote: "Chatterz's file organization and search capabilities have made our content collaboration so much easier." },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg flex flex-col border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            >
              <p className="text-lg mb-4 flex-grow italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="py-16 px-4 md:px-8 bg-gray-800/30 backdrop-blur-md relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {[
            { question: "Is Chatterz free to use?", answer: "Chatterz offers a free basic plan for small teams. We also have paid plans with additional features for growing teams and enterprises." },
            { question: "Can I access Chatterz on mobile devices?", answer: "Yes, Chatterz is fully responsive and can be accessed via web browsers on any device. We also have native mobile apps for iOS and Android for a better mobile experience." },
            { question: "How secure is Chatterz?", answer: "Security is our top priority. Chatterz uses end-to-end encryption for all communications, and we regularly undergo third-party security audits to ensure the highest level of data protection." },
            { question: "Can I integrate Chatterz with other tools?", answer: "Chatterz offers a wide range of integrations with popular tools and services. We also provide an API for custom integrations in our higher-tier plans." },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-4"
            >
              <motion.button
                className="w-full text-left p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300"
                onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{faq.question}</span>
                  {selectedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </motion.button>
              <motion.div
                initial={false}
                animate={{ height: selectedFaq === index ? 'auto' : 0, opacity: selectedFaq === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gray-700/30 backdrop-blur-md rounded-lg mt-2 p-4"
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to transform your team communication?
          </h2>
          <p className="text-xl mb-8">Join thousands of teams already using Chatterz to boost their productivity and collaboration.</p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-purple-500 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />
      </section>

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
          {[
            { title: "Product", items: ["Features", "Pricing", "Integrations", "FAQ"] },
            { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
            { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance"] },
          ].map((column, index) => (
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