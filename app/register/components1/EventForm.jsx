import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { FaIdCard, FaUsers, FaCalendarAlt, FaImage } from "react-icons/fa"
import { MdEventAvailable, MdDescription } from "react-icons/md"
import { IoSendSharp, IoLocationOutline } from "react-icons/io5"
import { BsClock, BsPersonCircle } from "react-icons/bs"
import { FaRegClock } from "react-icons/fa"
import { db } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function EventForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    panNumber: "",
    eventName: "",
    description: "",
    requiredMembers: 1,
    startDate: null,
    endDate: null,
    organizer: "",
    location: "",
    duration: "",
    time: "",
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      newErrors.panNumber = "PAN number must be 10 characters"
    }
    if (!formData.eventName || formData.eventName.length < 3) {
      newErrors.eventName = "Event name must be at least 3 characters"
    }
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }
    if (!formData.requiredMembers || formData.requiredMembers < 1) {
      newErrors.requiredMembers = "At least 1 member is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    }
    if (!formData.location) {
      newErrors.location = "Location is required"
    }
    if (!formData.organizer) {
      newErrors.organizer = "Organizer name is required"
    }
    if (!formData.time) {
      newErrors.time = "Event time is required"
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await addDoc(collection(db, "events"), {
        ...formData,
        createdAt: new Date(),
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
      })
      router.push("/")
    } catch (error) {
      console.error("Error adding event: ", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white max-w-3xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaIdCard className="text-purple-500" />
            PAN Number
          </label>
          <Input 
            name="panNumber" 
            placeholder="ABCDE1234F" 
            value={formData.panNumber} 
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.panNumber && <p className="text-sm text-red-400">{errors.panNumber}</p>}
          <p className="text-sm text-gray-400">Enter your valid PAN card number</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MdEventAvailable className="text-purple-500" />
            Event Name
          </label>
          <Input 
            name="eventName" 
            placeholder="Tree Planting Drive" 
            value={formData.eventName} 
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.eventName && <p className="text-sm text-red-400">{errors.eventName}</p>}
          <p className="text-sm text-gray-400">Give your event a meaningful name</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <MdDescription className="text-purple-500" />
          Event Description
        </label>
        <Textarea
          name="description"
          placeholder="Describe your event in detail..."
          value={formData.description}
          onChange={handleChange}
          className="min-h-[120px] bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
            focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-y"
        />
        {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
        <p className="text-sm text-gray-400">Provide detailed information about your event</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <FaUsers className="text-purple-500" />
          Required Members
        </label>
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            name="requiredMembers"
            min={1}
            value={formData.requiredMembers}
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        {errors.requiredMembers && <p className="text-sm text-red-400">{errors.requiredMembers}</p>}
        <p className="text-sm text-gray-400">Number of volunteers needed for the event</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            Start Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full pl-3 text-left font-normal bg-[#2A2A2F] border-2 border-purple-500/30 
                  hover:bg-[#3A3A3F] hover:border-purple-500/50 ${!formData.startDate && "text-gray-400"}`}
              >
                {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2A2A2F] border-purple-500/30" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                initialFocus
                className="bg-[#2A2A2F]"
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && <p className="text-sm text-red-400">{errors.startDate}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            End Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full pl-3 text-left font-normal bg-[#2A2A2F] border-2 border-purple-500/30 
                  hover:bg-[#3A3A3F] hover:border-purple-500/50 ${!formData.endDate && "text-gray-400"}`}
              >
                {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2A2A2F] border-purple-500/30" align="start">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                initialFocus
                className="bg-[#2A2A2F]"
              />
            </PopoverContent>
          </Popover>
          {errors.endDate && <p className="text-sm text-red-400">{errors.endDate}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <IoLocationOutline className="text-purple-500" />
            Location
          </label>
          <Input
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.location && <p className="text-sm text-red-400">{errors.location}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <BsPersonCircle className="text-purple-500" />
            Organizer Name
          </label>
          <Input
            name="organizer"
            placeholder="Organizer Name"
            value={formData.organizer}
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.organizer && <p className="text-sm text-red-400">{errors.organizer}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <BsClock className="text-purple-500" />
            Event Time
          </label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.time && <p className="text-sm text-red-400">{errors.time}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaRegClock className="text-purple-500" />
            Duration
          </label>
          <Input
            name="duration"
            placeholder="e.g. 2 hours"
            value={formData.duration}
            onChange={handleChange}
            className="bg-[#2A2A2F] border-2 border-purple-500/30 text-white placeholder:text-gray-400
              focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
          {errors.duration && <p className="text-sm text-red-400">{errors.duration}</p>}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
          py-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02]
          hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25
          flex items-center justify-center gap-2"
      >
        <IoSendSharp className="text-xl" />
        Create Event
      </Button>
    </form>
  )
}

