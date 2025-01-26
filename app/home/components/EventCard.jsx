import React from "react"
import { motion } from "framer-motion"
import { FaCalendar, FaClock, FaMapMarkerAlt } from "react-icons/fa"

const EventCard = ({ title, date, time, location, credits, image }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden w-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-36 sm:h-48 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-black">{title}</h3>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center text-gray-600">
            <FaCalendar className="mr-2 text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2 text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">{location}</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
          <span className="text-violet-600 font-semibold text-sm sm:text-base">{credits} Credits</span>
          <motion.button
            className="bg-violet-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard

