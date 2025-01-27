import React from "react"
import { motion } from "framer-motion"
import { FaCalendar, FaClock, FaMapMarkerAlt } from "react-icons/fa"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { useRouter } from 'next/navigation'

const EventCard = ({ title, date, time, location, status, registrationId }) => {
  const router = useRouter();

  const handleChatClick = () => {
    router.push(`/chat?eventId=${registrationId}&eventName=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-lg shadow-md overflow-hidden w-full border border-gray-800"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">{title}</h3>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center text-gray-300">
            <FaCalendar className="mr-2 text-sm sm:text-base text-purple-500" />
            <span className="text-xs sm:text-sm">{date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaClock className="mr-2 text-sm sm:text-base text-purple-500" />
            <span className="text-xs sm:text-sm">{time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaMapMarkerAlt className="mr-2 text-sm sm:text-base text-purple-500" />
            <span className="text-xs sm:text-sm">{location}</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'registered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {status || 'Registered'}
          </span>
          <motion.button
            onClick={handleChatClick}
            className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm w-full sm:w-auto hover:bg-purple-700 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChatbubbleEllipsesOutline className="text-base" />
            Chat
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard

