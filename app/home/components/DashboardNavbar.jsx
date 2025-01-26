import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBell, FaUser, FaPlus } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center">
            <span className="text-lg sm:text-xl font-bold text-violet-600">Eventify</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-violet-600"
              onClick={() => window.location.href = '/register'}
              title="Add your event"
            >
              <FaPlus className="text-lg sm:text-xl" />
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 text-gray-600 hover:text-violet-600 cursor-pointer"
            >
              <FaUser className="text-lg sm:text-xl" />
              <span className="hidden sm:block">Profile</span>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 