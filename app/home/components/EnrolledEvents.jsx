import React from "react"
import EventCard from "./EventCard"
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

const eventsData = [
  {
    id: 1,
    title: "Community Clean-up Drive",
    date: "Feb 15, 2024",
    time: "9:00 AM",
    location: "Central Park",
    credits: 50,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Food Bank Volunteering",
    date: "Feb 18, 2024",
    time: "2:00 PM",
    location: "City Food Bank",
    credits: 30,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Senior Center Visit",
    date: "Feb 20, 2024",
    time: "10:00 AM",
    location: "Golden Age Center",
    credits: 40,
    image: "/placeholder.svg?height=200&width=400",
  },
]

const EnrolledEvents = () => {
  return (
    <section className="py-12 relative">
      <BackgroundAnimation />
      
      <div className="container mx-auto px-4 relative">
        <h2 className="text-2xl font-bold mb-6 text-white">Enrolled Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EnrolledEvents

