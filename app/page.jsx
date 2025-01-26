"use client"
import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Footer from "../components/Footer"
import BackgroundAnimation from "../components/ui/BackgroundAnimation"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <BackgroundAnimation />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default LandingPage

