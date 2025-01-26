import React from "react"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Eventify</h3>
            <p className="text-sm sm:text-base text-gray-300">Connecting volunteers with meaningful opportunities.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-violet-400 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-violet-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-violet-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm sm:text-base text-gray-300">info@eventify.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-xs sm:text-sm text-center text-gray-300">
          © {new Date().getFullYear()} Eventify. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

