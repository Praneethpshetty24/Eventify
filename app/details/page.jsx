'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { MdDescription, MdGroups } from 'react-icons/md'
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5'
import { BsPersonCircle } from 'react-icons/bs'
import Link from 'next/link'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { useSearchParams } from 'next/navigation'

// Create a separate component for the content that uses useSearchParams
function EventDetailsContent() {
  const searchParams = useSearchParams();
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    description: "",
    imageUrl: "",
    requiredMembers: 0,
    startDate: "",
    endDate: "",
    organizer: "",
    location: "",
    duration: "",
    time: "",
  });

  useEffect(() => {
    // Get event details from URL parameters
    const details = {
      eventName: searchParams.get('eventName') || "",
      description: searchParams.get('description') || "",
      imageUrl: searchParams.get('imageUrl') || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      requiredMembers: parseInt(searchParams.get('requiredMembers')) || 0,
      startDate: searchParams.get('startDate') || "",
      endDate: searchParams.get('endDate') || "",
      organizer: searchParams.get('organizer') || "",
      location: searchParams.get('location') || "",
      duration: searchParams.get('duration') || "",
      time: searchParams.get('time') || "",
    };
    setEventDetails(details);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-8">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Event Details
          </h1>
        </div>

        {/* Event Title Card */}
        <div className="bg-[#1E1E24] p-8 rounded-2xl border border-purple-500/20 mb-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Container */}
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
              <img 
                src={eventDetails.imageUrl} 
                alt={eventDetails.eventName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {eventDetails.eventName}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-purple-500" />
                    {eventDetails.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <BsPersonCircle className="text-purple-500" />
                    {eventDetails.organizer}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                  py-4 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02]
                  hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25
                  text-lg">
                  Register as Volunteer
                </button>
                <Link href="/volunteer" 
                  className="flex-1 bg-[#2A2A2F] text-white font-semibold py-4 px-6 rounded-xl
                    transition duration-300 ease-in-out transform hover:scale-[1.02] text-center
                    border border-purple-500/20 hover:bg-[#2A2A2F]/80 text-lg
                    flex items-center justify-center gap-2">
                  <MdGroups className="text-xl text-purple-500" />
                  View Volunteers
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaRegClock className="text-2xl text-purple-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-medium">{eventDetails.duration}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E1E24] p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaUsers className="text-2xl text-purple-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Volunteers Needed</p>
                    <p className="text-white font-medium">{eventDetails.requiredMembers} spots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-[#1E1E24] p-8 rounded-xl border border-purple-500/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MdDescription className="text-purple-500" />
                About Event
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {eventDetails.description}
              </p>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div>
            <div className="bg-[#1E1E24] p-8 rounded-xl border border-purple-500/20 sticky top-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <IoTimeOutline className="text-purple-500" />
                Schedule
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 mb-2">Date</p>
                  <div className="flex items-center gap-2 text-white">
                    <FaCalendarAlt className="text-purple-500" />
                    {new Date(eventDetails.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Time</p>
                  <div className="flex items-center gap-2 text-white">
                    <FaRegClock className="text-purple-500" />
                    {eventDetails.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component wrapped with Suspense
export default function EventDetails() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-8">
      <BackgroundAnimation />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      }>
        <EventDetailsContent />
      </Suspense>
    </div>
  );
}