import React from "react"
import { motion } from "framer-motion"
import { FaClock, FaUsers, FaStar } from "react-icons/fa"

const ImpactCard = ({ icon: Icon, value, label }) => (
  <motion.div
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <Icon className="text-3xl sm:text-4xl text-violet-600 mx-auto mb-3 sm:mb-4" />
    <h3 className="text-xl sm:text-2xl font-bold text-black mb-1 sm:mb-2">{value}</h3>
    <p className="text-sm sm:text-base text-gray-600">{label}</p>
  </motion.div>
)

const ImpactSection = () => {
  const stats = [
    { icon: FaClock, value: "120+", label: "Hours Volunteered" },
    { icon: FaUsers, value: "15", label: "Events Completed" },
    { icon: FaStar, value: "250", label: "Credits Earned" },
  ]

  return (
    <section className="bg-gray-50 py-6 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black text-center">Your Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <ImpactCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

