import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBell, FaUser, FaPlus, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center">
            <FaCalendarAlt className="text-lg sm:text-xl text-violet-400 mr-2" />
            <span className="text-lg sm:text-xl font-bold text-violet-400">Eventify</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-violet-400"
              onClick={() => window.location.href = '/register'}
              title="Add your event"
            >
              <FaPlus className="text-lg sm:text-xl" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-violet-400"
              onClick={() => window.location.href = '/fund'}
              title="Fund your event"
            >
              <FaRupeeSign className="text-lg sm:text-xl" />
            </motion.button>
            
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 text-gray-300 hover:text-violet-400 cursor-pointer"
              >
                <FaUser className="text-lg sm:text-xl" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 