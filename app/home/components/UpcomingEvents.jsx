import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import { useRouter } from 'next/navigation'
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { db } from "@/firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

const UpcomingEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(
        collection(db, "events"),
        orderBy("startDate", "asc"),
        limit(2)
      );

      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
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

  return (
    <section className="py-12 bg-[#0A0A0F] relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <motion.button 
            className="flex items-center text-purple-400 hover:text-purple-300" 
            whileHover={{ x: 5 }}
            onClick={() => router.push('/events')}
          >
            View All <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <motion.div 
              key={event.id}
              className="bg-[#1E1E24] p-6 rounded-lg shadow-lg border border-purple-500/20" 
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{event.eventName}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-400">
                    {new Date(event.startDate).toLocaleDateString()} • {event.requiredMembers} Members Needed
                  </div>
                </div>
                <motion.button
                  onClick={() => handleRegisterClick(event)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents

