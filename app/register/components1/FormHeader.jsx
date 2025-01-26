import { FaHandsHelping } from "react-icons/fa"

export default function FormHeader() {
    return (
      <div className="mb-8 text-center">
        <FaHandsHelping className="mx-auto text-6xl text-purple-500 mb-4" />
        <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Create Event
        </h1>
        <p className="mt-2 text-gray-400">Register your volunteering event and make a difference</p>
      </div>
    )
  }
  
  