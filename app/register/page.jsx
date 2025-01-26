"use client"

import EventForm from "./components1/EventForm"
import FormHeader from "./components1/FormHeader"
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'

export default function EventRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] p-4 md:p-8 relative">
      <BackgroundAnimation />
      
      <div className="relative mx-auto max-w-2xl rounded-xl bg-[#1E1E24] p-6 shadow-lg md:p-8 text-white border border-purple-500/20">
        <FormHeader />
        <EventForm />
      </div>
    </div>
  )
}

