'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { XCircle } from 'lucide-react'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

export default function PaymentError() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/home')
    }, 2500)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
      <BackgroundAnimation className="opacity-30" />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex justify-center"
        >
          <XCircle className="w-24 h-24 text-purple-500/80" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Registration Canceled
          </h1>
          <p className="text-gray-400 mb-4">
            Your registration was not completed
          </p>
          <p className="text-gray-500 text-sm">
            Redirecting to Home page...
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "linear" }}
            className="h-1 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 mt-8 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}
