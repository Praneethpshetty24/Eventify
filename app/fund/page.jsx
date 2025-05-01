'use client'
import React, { useState } from 'react'
import { FaRupeeSign } from "react-icons/fa"
import { BsShieldLockFill } from "react-icons/bs"
import { MdPayment } from "react-icons/md"
import { IoWalletOutline } from "react-icons/io5"
import BackgroundAnimation from '@/components/ui/BackgroundAnimation'
import RouteGuard from '../components/RouteGuard'

function FundPage() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFund = async () => {
    if (!amount || amount <= 0) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(amount) }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
    setLoading(false)
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#0A0A0F] py-12 px-4 sm:px-6 lg:px-8 relative">
        <BackgroundAnimation />
        
        <div className="relative max-w-md mx-auto bg-[#1E1E24] rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20">
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <IoWalletOutline className="mx-auto text-6xl text-purple-500 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Support the Event</h2>
              <p className="text-gray-400">Your contribution makes a difference</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Amount.
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-purple-500" />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-8 pr-12 py-4 bg-[#2A2A2F] border-2 border-purple-500/30 rounded-lg 
                      focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500
                      transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <button
                onClick={handleFund}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                  py-4 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02]
                  hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  <MdPayment className="text-xl" />
                  <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
                </div>
              </button>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <BsShieldLockFill className="text-green-500" />
                  <span className="text-sm">100% secure payment</span>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center bg-[#2A2A2F] p-2 rounded-lg">
                    <span role="img" aria-label="Visa" className="text-2xl">💳</span>
                  </div>
                  <div className="flex items-center justify-center bg-[#2A2A2F] p-2 rounded-lg">
                    <span role="img" aria-label="MasterCard" className="text-2xl">🟡🔴</span>
                  </div>
                  <div className="flex items-center justify-center bg-[#2A2A2F] p-2 rounded-lg">
                    <span role="img" aria-label="UPI" className="text-2xl">📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}

export default FundPage