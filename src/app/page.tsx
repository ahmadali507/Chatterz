'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Header from '@/components/landingPage/Header'
import DummyChat from '@/components/landingPage/DummyChat'
import Choose from '@/components/landingPage/Choose'
import Plan from '@/components/landingPage/Plan'
import Testimonials from '@/components/landingPage/Testimonials'
import FAQs from '@/components/landingPage/FAQs'
import Footer from '@/components/landingPage/Footer'

export default function Component() {

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
      <Choose/>
      <Plan/>
      <Testimonials/>
      <FAQs/>
      <Footer/>   
    </div>
  )
}