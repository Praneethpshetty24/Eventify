"use client"

import EventForm from "./components1/EventForm"
import FormHeader from "./components1/FormHeader"

export default function EventRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg md:p-8">
        <FormHeader />
        <EventForm />
      </div>
    </div>
  )
}

