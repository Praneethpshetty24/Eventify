'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { MdDescription, MdGroups } from 'react-icons/md'
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5'
import { BsPersonCircle } from 'react-icons/bs'
import Link from 'next/link'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import RouteGuard from '../components/RouteGuard'

import { db, auth } from '@/firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import SuccessPopup from './components/SuccessPopup'


const Map = dynamic(
  () => import('./components/Map'),
  { ssr: false }
)


function EventDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    id: "",
    eventName: "",
    description: "",
    requiredMembers: 0,
    startDate: "",
    endDate: "",
    organizer: "",
    location: "",
    duration: "",
    time: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const details = {
        id: searchParams.get('id'),
        eventName: searchParams.get('eventName'),
        description: searchParams.get('description'),
        requiredMembers: parseInt(searchParams.get('requiredMembers')) || 0,
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        organizer: searchParams.get('organizer'),
        location: searchParams.get('location'),
        duration: searchParams.get('duration'),
        time: searchParams.get('time'),
      };

      if (!details.id || !details.eventName) {
        throw new Error('Missing required event details');
      }

      setEventDetails(details);
    } catch (error) {
      console.error('Error setting event details:', error);
      setError('Failed to load event details');
    }
  }, [searchParams]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleRegistration = async () => {
    try {
      if (!currentUser) {
        router.push('/login');
        return;
      }

      if (!eventDetails.id) {
        throw new Error('Event ID is missing');
      }

      setIsRegistering(true);
      setError(null);

      const registrationsRef = collection(db, 'registrations');
      const q = query(
        registrationsRef,
        where('userId', '==', currentUser.uid),
        where('eventId', '==', eventDetails.id)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        throw new Error('You have already registered for this event!');
      }

      const registrationData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        eventId: eventDetails.id,
        eventName: eventDetails.eventName,
        registrationDate: serverTimestamp(),
        status: 'registered',
        eventDate: eventDetails.startDate,
        eventTime: eventDetails.time,
        eventLocation: eventDetails.location,
        organizerName: eventDetails.organizer,
        duration: eventDetails.duration,
      };

      await addDoc(collection(db, 'registrations'), registrationData);
      setShowPopup(true);
    } catch (error) {
      console.error('Error registering for event:', error);
      setError(error.message || 'Failed to register for event. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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

        <div className="bg-[#1E1E24] p-8 rounded-2xl border border-purple-500/20 mb-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pass location to Map component */}
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
              <Map location={eventDetails.location} />
            </div>

           
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

             
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                  onClick={handleRegistration}
                  disabled={isRegistering}
                  className={`flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                    py-4 px-6 rounded-xl transition duration-300 ease-in-out transform 
                    ${!isRegistering && 'hover:scale-[1.02] hover:from-purple-700 hover:to-indigo-700'} 
                    shadow-lg hover:shadow-purple-500/25 text-lg
                    ${isRegistering && 'opacity-75 cursor-not-allowed'}`}
                >
                  {isRegistering ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Registering...
                    </div>
                  ) : (
                    'Register as Volunteer'
                  )}
                </button>
              
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2 space-y-8">
        
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

      {/* Add Success Popup */}
      <SuccessPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="Successfully registered for the event!"
      />
    </div>
  )
}

// Main component wrapped with Suspense
export default function EventDetails() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0F]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <RouteGuard>
        <EventDetailsContent />
      </RouteGuard>
    </Suspense>
  );
}