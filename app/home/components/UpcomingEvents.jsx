import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaArrowRight, FaCalendarAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa"
import { useRouter } from 'next/navigation'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { db } from "@/firebase"
import { collection, query, orderBy, getDocs } from "firebase/firestore"

const UpcomingEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const q = query(
        collection(db, "events"),
        orderBy("startDate", "asc")
      );

      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    // Create a URL-safe query string from the event data
    const queryParams = new URLSearchParams({
      id: event.id,
      eventName: event.eventName,
      description: event.description,
      startDate: event.startDate,
      requiredMembers: event.requiredMembers,
      // Add other event properties you want to pass
      organizer: event.organizer || '',
      location: event.location || '',
      imageUrl: event.imageUrl || '',
      duration: event.duration || '',
      time: event.time || '',
    }).toString();

    router.push(`/details?${queryParams}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#0A0A0F] relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Upcoming Events</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {events.map((event) => (
            <motion.div 
              key={event.id}
              className="bg-[#1E1E24] p-4 md:p-6 rounded-lg shadow-lg border border-purple-500/20 flex flex-col" 
              whileHover={{ y: -5 }}
            >
              {event.imageUrl && (
                <div className="mb-4 w-full h-48 overflow-hidden rounded-lg">
                  <img 
                    src={event.imageUrl} 
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-white line-clamp-1">{event.eventName}</h3>
                  <p className="text-gray-300 mb-4 text-sm line-clamp-2">{event.description}</p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-400" />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-purple-400" />
                      {event.requiredMembers} Members Needed
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-purple-400" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleRegisterClick(event)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 mt-4 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No upcoming events at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default UpcomingEvents

