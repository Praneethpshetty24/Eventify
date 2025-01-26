import React from "react"
import { motion } from "framer-motion"
import { FaCalendar } from "react-icons/fa"

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50" 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-white"
          whileHover={{ scale: 1.1 }}
        >
          <FaCalendar className="text-violet-600" />
          <span>Eventify</span>
        </motion.div>
        <motion.button
          className="bg-violet-600 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-full hover:bg-violet-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navbar

