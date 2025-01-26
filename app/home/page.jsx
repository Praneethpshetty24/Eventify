"use client"
import React, { useState } from "react"
import DashboardNavbar from "./components/DashboardNavbar"
import ImpactSection from "./components/ImpactSection"
import EnrolledEvents from "./components/EnrolledEvents"
import UpcomingEvents from "./components/UpcomingEvents"
import Credits from "./components/Credits"
import { FaChartLine, FaCalendarCheck, FaCalendarAlt, FaCoins } from 'react-icons/fa'

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState('impact')

  const navItems = [
    { id: 'impact', label: 'Impact', icon: FaChartLine },
    { id: 'enrolled', label: 'Enrolled Events', icon: FaCalendarCheck },
    { id: 'upcoming', label: 'Upcoming', icon: FaCalendarAlt },
    { id: 'credits', label: 'Credits', icon: FaCoins },
  ]

  const renderComponent = () => {
    switch (activeComponent) {
      case 'impact':
        return <ImpactSection />
      case 'enrolled':
        return <EnrolledEvents />
      case 'upcoming':
        return <UpcomingEvents />
      case 'credits':
        return <Credits />
      default:
        return <ImpactSection />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4">
        {/* Navigation */}
        <nav className="flex justify-between mb-6 bg-gray-900 rounded-lg p-1 shadow-sm">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveComponent(id)}
              className={`flex items-center justify-center px-3 py-2 rounded-full text-sm flex-1 mx-1
                ${activeComponent === id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }`}
            >
              <Icon className="text-lg sm:mr-2" />
              <span className="hidden sm:inline">{label}</span>
              {/* Show shorter text on medium screens */}
              <span className="hidden xs:inline sm:hidden">
                {label.split(' ')[0]}
              </span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="mt-4 text-white">
          {renderComponent()}
        </main>
      </div>
    </div>
  )
}

export default HomePage

