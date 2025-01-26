import React from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import { useRouter } from 'next/navigation'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

const UpcomingEvents = () => {
  const router = useRouter();

  return (
    <section className="py-12 bg-[#0A0A0F] relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <motion.button className="flex items-center text-purple-400 hover:text-purple-300" whileHover={{ x: 5 }}>
            View All <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="bg-[#1E1E24] p-6 rounded-lg shadow-lg border border-purple-500/20" whileHover={{ y: -5 }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Tree Planting Initiative</h3>
                <p className="text-gray-300 mb-4">Join us in making our city greener!</p>
                <div className="text-sm text-gray-400">Feb 25, 2024 • 60 Credits</div>
              </div>
              <motion.button
                onClick={() => router.push('/details')}
                className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          </motion.div>
          <motion.div className="bg-[#1E1E24] p-6 rounded-lg shadow-lg border border-purple-500/20" whileHover={{ y: -5 }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Youth Mentorship Program</h3>
                <p className="text-gray-300 mb-4">Help shape the future leaders!</p>
                <div className="text-sm text-gray-400">Mar 1, 2024 • 80 Credits</div>
              </div>
              <motion.button
                onClick={() => router.push('/details')}
                className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700"
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

