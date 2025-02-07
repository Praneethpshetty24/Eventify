'use client'
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaClock, FaCalendarCheck } from "react-icons/fa"
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const ImpactCard = ({ icon: Icon, value, label }) => (
  <motion.div
    className="bg-[#1E1E24] p-4 sm:p-6 rounded-lg shadow-lg text-center border border-purple-500/20"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <Icon className="text-3xl sm:text-4xl text-purple-400 mx-auto mb-3 sm:mb-4" />
    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{value}</h3>
    <p className="text-sm sm:text-base text-gray-300">{label}</p>
  </motion.div>
)

const ImpactSection = () => {
  const [stats, setStats] = useState([
    { icon: FaClock, value: "0", label: "Hours Committed" },
    { icon: FaCalendarCheck, value: "0", label: "Total Registrations" },
  ])

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const registrationsRef = collection(db, 'registrations');
        const userRegistrationsQuery = query(
          registrationsRef,
          where('userId', '==', user.uid)
        );
        
        const snapshot = await getDocs(userRegistrationsQuery);
        
        let totalEvents = 0;
        let totalHours = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          totalEvents++;

          // Add duration if it exists
          if (data.duration) {
            const hours = parseInt(data.duration);
            if (!isNaN(hours)) {
              totalHours += hours;
            }
          }
        });

        setStats([
          { icon: FaClock, value: `${totalHours}`, label: "Hours Committed" },
          { icon: FaCalendarCheck, value: totalEvents.toString(), label: "Total Registrations" },
        ]);

      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <section className="bg-[#0A0A0F] py-6 sm:py-12 relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white text-center">Your Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <ImpactCard key={index} {...stat} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => window.location.href='/todo'} 
            className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
          >
            Share Your Thoughts
          </button>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

