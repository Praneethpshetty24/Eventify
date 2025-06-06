'use client';
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import BackgroundAnimation from "./ui/BackgroundAnimation"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push('/home')
    } else {
      router.push('/signin')
    }
  }

  useEffect(() => {
    // Put any window-dependent code here
    // This will only run on the client side
  }, []);

  return (
    <div className="bg-black py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <BackgroundAnimation />
      </div>
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Make a Difference in Your Community
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join events and volunteer for causes you care about
        </motion.p>
        <motion.button
          className="bg-violet-600 text-white font-bold py-2 px-4 sm:px-6 text-sm sm:text-base rounded-full hover:bg-violet-700 transition duration-300 mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
        >
          {user ? 'Go to Dashboard' : 'Get Started'}
        </motion.button>
      </div>
    </div>
  )
}

export default Hero

