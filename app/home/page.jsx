"use client"
import React, { useState } from "react"
import DashboardNavbar from "./components/DashboardNavbar"
import ImpactSection from "./components/ImpactSection"
import EnrolledEvents from "./components/EnrolledEvents"
import UpcomingEvents from "./components/UpcomingEvents"
import Credits from "./components/Credits"

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState('impact') // Default view

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
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <nav className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveComponent('impact')}
            className={`px-4 py-2 rounded-md ${
              activeComponent === 'impact'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Impact
          </button>
          <button
            onClick={() => setActiveComponent('enrolled')}
            className={`px-4 py-2 rounded-md ${
              activeComponent === 'enrolled'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Enrolled Events
          </button>
          <button
            onClick={() => setActiveComponent('upcoming')}
            className={`px-4 py-2 rounded-md ${
              activeComponent === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveComponent('credits')}
            className={`px-4 py-2 rounded-md ${
              activeComponent === 'credits'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Credits
          </button>
        </nav>

        {/* Content Area */}
        <main>
          {renderComponent()}
        </main>
      </div>
    </div>
  )
}

export default HomePage

