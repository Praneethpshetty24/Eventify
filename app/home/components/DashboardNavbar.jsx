import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBell, FaUser } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-violet-600">Eventify</span>
          </Link>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 text-gray-600 hover:text-violet-600"
            >
              <FaBell className="text-xl" />
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-violet-600 cursor-pointer"
            >
              <FaUser className="text-xl" />
              <span className="hidden md:block">Profile</span>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 