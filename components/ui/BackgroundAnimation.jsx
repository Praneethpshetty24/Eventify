import React from "react"
import { motion } from "framer-motion"
import { FaHandsHelping, FaHeart, FaUsers, FaCalendarAlt } from "react-icons/fa"

const BackgroundAnimation = () => {
  const icons = [FaHandsHelping, FaHeart, FaUsers, FaCalendarAlt]
  const isBrowser = typeof window !== "undefined" // Check if running in a browser

  return (
    <div className="fixed inset-0 z-0 opacity-[0.03] sm:opacity-[0.05] pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const Icon = icons[i % icons.length]
        const size = isBrowser 
          ? Math.random() * (window.innerWidth < 640 ? 15 : 20) + (window.innerWidth < 640 ? 8 : 10) 
          : 10 // Fallback size if not in browser

        return (
          <motion.div
            key={i}
            className="absolute text-violet-500"
            initial={{
              x: isBrowser ? Math.random() * window.innerWidth : 0,
              y: isBrowser ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              x: isBrowser ? Math.random() * window.innerWidth : 0,
              y: isBrowser ? Math.random() * window.innerHeight : 0,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default BackgroundAnimation

