'use client'
import React, { useState } from 'react'
import { FaUserCircle, FaPaperPlane, FaSmile } from 'react-icons/fa'

export default function ChatPage() {
  const [message, setMessage] = useState('')

  // Dummy chat data
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      message: "Hey everyone! Looking forward to the tree planting event!",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      message: "Me too! Does anyone know if we need to bring our own tools?",
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      sender: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      message: "The organizers will provide all necessary equipment. We just need to bring water and enthusiasm! 😊",
      timestamp: "10:35 AM"
    }
  ]

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#1A1A1F] border-b border-purple-500/20 p-4">
          <h1 className="text-xl font-bold">Event Chat</h1>
          <p className="text-sm text-gray-400">Tree Planting Drive</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <img 
                src={msg.avatar}
                alt={msg.sender}
                className="w-10 h-10 rounded-full border border-purple-500/30"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-gray-300 mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="bg-[#1A1A1F] border-t border-purple-500/20 p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#2A2A2F] border-2 border-purple-500/30 rounded-xl px-4 py-2
                focus:outline-none focus:border-purple-500/50 text-white placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 rounded-xl
                transition duration-300 ease-in-out transform hover:scale-[1.02]
                hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
            >
              <FaPaperPlane />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}