import React from "react"
import { motion } from "framer-motion"
import { FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa"

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-black" whileHover={{ y: -5 }}>
    <Icon className="text-3xl sm:text-4xl text-violet-600 mb-3 sm:mb-4" />
    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">{title}</h3>
    <p className="text-sm sm:text-base text-black">{description}</p>
  </motion.div>
)

const Features = () => {
  const features = [
    {
      icon: FaHandsHelping,
      title: "Create Events",
      description: "Easily create and manage volunteering events in your area.",
    },
    {
      icon: FaHeart,
      title: "Find Opportunities",
      description: "Discover and join volunteering opportunities that match your interests.",
    },
    {
      icon: FaUsers,
      title: "Build Community",
      description: "Connect with like-minded individuals and make a positive impact together.",
    },
  ]

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-6 sm:mb-8 lg:mb-12">
          Why Choose Eventify?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features

