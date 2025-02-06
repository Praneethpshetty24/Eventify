'use client'
import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaEnvelope, FaCalendarAlt } from 'react-icons/fa'
import { auth } from '@/firebase'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import RouteGuard from '../components/RouteGuard'

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName || 'User',
          email: user.email,
          joinedDate: user.metadata.creationTime
        })
      }
    })

    return () => unsubscribe()
  }, [])

  if (!user) {
    return <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
      Loading...
    </div>
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#0A0A0F] text-white py-8">
        <BackgroundAnimation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-[#1A1A1F] rounded-2xl border border-purple-500/20 overflow-hidden mb-8 shadow-lg">
            <div className="p-8 bg-gradient-to-r from-[#1A1A1F] to-[#1E1E24]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <FaUserCircle className="w-32 h-32 text-purple-500" />
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
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
      </div>
    </RouteGuard>
  )
}