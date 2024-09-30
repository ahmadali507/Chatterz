'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Zap, Lock, Globe, Users, BarChart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FeatureCardType , StatCardType } from '@/types/types'

const FeatureCard = ({ icon, title, description } : FeatureCardType) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
)

const StatCard = ({ icon, value, label } : StatCardType) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 text-center"
  >
    {icon}
    <h3 className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
      {value}
    </h3>
    <p className="text-gray-300">{label}</p>
  </motion.div>
)

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    content: "Chatterz has transformed the way our team communicates. The intuitive interface and powerful features have significantly boosted our productivity.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Alex Chen",
    role: "Lead Developer at InnoSoft",
    content: "As a developer, I appreciate the seamless integrations and robust API that Chatterz offers. It's become an indispensable tool in our tech stack.",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director at GrowthHub",
    content: "The analytics and reporting features in Chatterz have given us valuable insights into our team's communication patterns, helping us optimize our workflows.",
    avatar: "/placeholder.svg?height=100&width=100"
  }
]

export default function AboutSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="about" className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Revolutionizing Team Communication
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chatterz is more than just a chat app. It's a comprehensive platform designed to enhance team collaboration, streamline workflows, and boost productivity in the modern workplace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8 text-blue-400" />}
            title="Intuitive Messaging"
            description="Experience fluid conversations with real-time messaging, threaded replies, and rich media support. Stay connected with your team like never before."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-400" />}
            title="Lightning Fast"
            description="Built on cutting-edge technology, Chatterz ensures instant message delivery and seamless performance, even with large teams and high message volumes."
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-green-400" />}
            title="Bank-Level Security"
            description="Your data's safety is our top priority. Enjoy peace of mind with end-to-end encryption, two-factor authentication, and compliance with global security standards."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-purple-400" />}
            title="Seamless Integration"
            description="Chatterz plays well with others. Integrate your favorite tools and boost productivity with our extensive API and pre-built integrations with popular services."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Trusted by Teams Worldwide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              icon={<Users className="w-8 h-8 text-blue-400 mx-auto" />}
              value="1M+"
              label="Active Users"
            />
            <StatCard
              icon={<BarChart className="w-8 h-8 text-green-400 mx-auto" />}
              value="30%"
              label="Productivity Boost"
            />
            <StatCard
              icon={<Star className="w-8 h-8 text-yellow-400 mx-auto" />}
              value="4.8/5"
              label="Average Rating"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            What Our Users Say
          </h3>
          <div className="relative bg-gray-800/50 backdrop-blur-md p-8 rounded-lg border border-purple-500/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-lg text-gray-300 mb-4">"{testimonials[currentTestimonial].content}"</p>
                <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-gray-800/50 backdrop-blur-md p-8 rounded-lg border border-purple-500/30"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to transform your team's communication?
          </h3>
          <p className="text-gray-300 mb-6">
            Join over 1 million professionals already using Chatterz to boost their productivity and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-500 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}