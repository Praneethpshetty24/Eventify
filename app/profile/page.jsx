import React from 'react'

function page() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center">
        <div className="profile-section">
          <h2 className="text-black mb-4">User Profile</h2>
          <p className="text-black">Name: John Doe</p>
          <p className="text-black">Email: john.doe@example.com</p>
          <p className="text-black">Joined: January 1, 2023</p>
        </div>
      </div>
    </div>
  )
}

export default page