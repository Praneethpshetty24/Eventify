'use client'
import React from 'react'
import { FaUserCircle, FaPhone, FaEnvelope, FaCalendarCheck } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

export default function VolunteersPage() {
  // Dummy data for volunteers
  const volunteers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234-567-8900",
      joinedDate: "2024-01-20",
      status: "Confirmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "Team Leader"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 234-567-8901",
      joinedDate: "2024-01-21",
      status: "Confirmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Volunteer"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+1 234-567-8902",
      joinedDate: "2024-01-22",
      status: "Pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      role: "Volunteer"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.b@example.com",
      phone: "+1 234-567-8903",
      joinedDate: "2024-01-23",
      status: "Confirmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      role: "Coordinator"
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Registered Volunteers
          </h1>
          <p className="text-gray-400">
            Total Volunteers: {volunteers.length}
          </p>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((volunteer) => (
            <div 
              key={volunteer.id}
              className="bg-[#1A1A1F] rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                <div className="flex items-center gap-4">
                  <img 
                    src={volunteer.avatar}
                    alt={volunteer.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                  />
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {volunteer.name}
                      {volunteer.status === "Confirmed" && (
                        <MdVerified className="text-purple-500" />
                      )}
                    </h3>
                    <span className="text-sm text-purple-400">{volunteer.role}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-purple-500" />
                  <span className="text-sm">{volunteer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-purple-500" />
                  <span className="text-sm">{volunteer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendarCheck className="text-purple-500" />
                  <span className="text-sm">
                    Joined {new Date(volunteer.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="pt-4 border-t border-gray-800">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${volunteer.status === "Confirmed" 
                      ? "bg-green-500/10 text-green-400" 
                      : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                    {volunteer.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {volunteers.length === 0 && (
          <div className="text-center py-12">
            <FaUserCircle className="mx-auto text-6xl text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-400">No volunteers registered yet</h3>
            <p className="text-gray-500">Be the first one to register!</p>
          </div>
        )}
      </div>
    </div>
  )
}