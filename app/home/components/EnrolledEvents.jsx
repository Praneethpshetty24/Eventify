'use client'
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const EnrolledEvents = () => {
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEnrolledEvents = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError('Please login to view enrolled events');
          setLoading(false);
          return;
        }

        // First get all registrations for the current user
        const registrationsRef = collection(db, 'registrations');
        const registrationsQuery = query(
          registrationsRef,
          where('userId', '==', user.uid)
        );
        
        const registrationsSnapshot = await getDocs(registrationsQuery);
        
        // Get all events data
        const eventsData = registrationsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: data.eventId,
            title: data.eventName,
            date: new Date(data.eventDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            time: data.eventTime,
            location: data.eventLocation,
            status: data.status || 'registered',
            registrationId: doc.id,
            description: data.description,
            organizer: data.organizerName,
            duration: data.duration
          };
        });

        setEnrolledEvents(eventsData);
      } catch (error) {
        console.error('Error fetching enrolled events:', error);
        setError('Failed to load enrolled events');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledEvents();
  }, []);

  const handleViewDetails = (event) => {
    // Construct URL with all event details
    const params = new URLSearchParams({
      id: event.id,
      eventName: event.title,
      startDate: event.date,
      time: event.time,
      location: event.location,
      description: event.description || '',
      organizer: event.organizer || '',
      duration: event.duration || '',
    });

    router.push(`/details?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-2xl font-bold mb-6 text-white">Enrolled Events</h2>
        {enrolledEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>You haven't enrolled in any events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledEvents.map((event) => (
              <EventCard 
                key={event.registrationId}
                {...event}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EnrolledEvents;

