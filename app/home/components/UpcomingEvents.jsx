import React from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

const UpcomingEvents = () => {
  return (
    <section className="py-12 bg-violet-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Upcoming Events</h2>
          <motion.button className="flex items-center text-violet-600 hover:text-violet-700" whileHover={{ x: 5 }}>
            View All <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -5 }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Tree Planting Initiative</h3>
                <p className="text-gray-600 mb-4">Join us in making our city greener!</p>
                <div className="text-sm text-gray-500">Feb 25, 2024 • 60 Credits</div>
              </div>
              <motion.button
                className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -5 }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Youth Mentorship Program</h3>
                <p className="text-gray-600 mb-4">Help shape the future leaders!</p>
                <div className="text-sm text-gray-500">Mar 1, 2024 • 80 Credits</div>
              </div>
              <motion.button
                className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents

