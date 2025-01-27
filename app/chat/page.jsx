'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useSearchParams, useRouter } from 'next/navigation'
import { db, auth } from '@/firebase'
import { collection, query, where, orderBy, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'

// Create a separate component for content that uses useSearchParams
function ChatContent() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const eventId = searchParams.get('eventId')
  const eventName = searchParams.get('eventName')

  useEffect(() => {
    if (!eventId) {
      router.push('/home')
      return
    }

    if (!auth.currentUser) {
      router.push('/login')
      return
    }

    // Subscribe to messages for this specific event
    const messagesRef = collection(db, 'chats')
    const q = query(
      messagesRef,
      where('eventId', '==', eventId),
      orderBy('timestamp', 'asc')
    )

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMessages(newMessages)
        setLoading(false)
      },
      (err) => {
        console.error('Error fetching messages:', err)
        setError('Failed to load messages. Please try again later.')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [eventId, router])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim() || !auth.currentUser) return

    try {
      const messagesRef = collection(db, 'chats')
      await addDoc(messagesRef, {
        eventId,
        message: message.trim(),
        sender: auth.currentUser.displayName || 'Anonymous',
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#1A1A1F] border-b border-purple-500/20 p-4">
          <h1 className="text-xl font-bold">Event Chat</h1>
          <p className="text-sm text-gray-400">{eventName}</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{msg.sender}</span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp?.toDate().toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">{msg.message}</p>
                </div>
              </div>
            ))
          )}
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
              disabled={!message.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 rounded-xl
                transition duration-300 ease-in-out transform hover:scale-[1.02]
                hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
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

// Main component wrapped with Suspense
export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0F]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}