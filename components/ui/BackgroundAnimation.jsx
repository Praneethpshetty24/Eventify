import React from "react"
import { motion } from "framer-motion"
import { 
  FaDollarSign, 
  FaHandHoldingHeart, 
  FaHandHoldingUsd, 
  FaPiggyBank,
  FaSeedling,
  FaGlobe
} from "react-icons/fa"

const BackgroundAnimation = () => {
  const icons = [
    FaDollarSign, 
    FaHandHoldingHeart, 
    FaHandHoldingUsd, 
    FaPiggyBank,
    FaSeedling,
    FaGlobe
  ]
  const isBrowser = typeof window !== "undefined"

  return (
    <div className="fixed inset-0 z-0 opacity-[0.12] sm:opacity-[0.15] pointer-events-none overflow-hidden">
      {[...Array(24)].map((_, i) => {
        const Icon = icons[i % icons.length]
        const size = isBrowser 
          ? Math.random() * (window.innerWidth < 640 ? 15 : 20) + (window.innerWidth < 640 ? 8 : 10) 
          : 10

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ color: '#00FF00', filter: 'brightness(2)' }}
            initial={{
              x: isBrowser ? Math.random() * window.innerWidth : 0,
              y: isBrowser ? Math.random() * window.innerHeight : 0,
              rotate: 0,
              scale: 1
            }}
            animate={{
              x: isBrowser ? Math.random() * window.innerWidth : 0,
              y: isBrowser ? Math.random() * window.innerHeight : 0,
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear"
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

