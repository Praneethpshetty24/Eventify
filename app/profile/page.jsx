'use client'
import React from 'react'
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaMedal, FaClock, FaComments } from 'react-icons/fa'
import Link from 'next/link'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

export default function ProfilePage() {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2023-01-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    volunteeredHours: 120,
    eventsAttended: 15,
    upcomingEvents: 3,
    achievements: ["Event Leader", "100+ Hours", "Top Contributor"]
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-8">
      <BackgroundAnimation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#1A1A1F] rounded-2xl border border-purple-500/20 overflow-hidden mb-8 shadow-lg">
          <div className="p-8 bg-gradient-to-r from-[#1A1A1F] to-[#1E1E24]">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-purple-500/30"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  {user.achievements.map((achievement, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
                        bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      <FaMedal className="text-purple-500" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaClock className="text-2xl text-purple-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Hours Volunteered</p>
                    <p className="text-xl font-bold">{user.volunteeredHours}h</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-2xl text-purple-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Events Attended</p>
                    <p className="text-xl font-bold">{user.eventsAttended}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-2xl text-purple-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Upcoming Events</p>
                    <p className="text-xl font-bold">{user.upcomingEvents}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 space-y-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-purple-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCalendarAlt className="text-purple-500" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>

          {/* Side Actions */}
          <div className="space-y-6">
            <Link 
              href="/chat"
              className="block bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 
                hover:border-purple-500/40 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <FaComments className="text-2xl text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Open Chat</h3>
                  <p className="text-sm text-gray-400">Message other volunteers</p>
                </div>
              </div>
            </Link>

            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
              py-4 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02]
              hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}