import { useState } from "react"
import { CalendarIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function EventForm() {
  const [formData, setFormData] = useState({
    panNumber: "",
    eventName: "",
    requiredMembers: 1,
    startDate: null,
    endDate: null,
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
    if (!formData.requiredMembers || formData.requiredMembers < 1) {
      newErrors.requiredMembers = "At least 1 member is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log(formData)
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">PAN Number</label>
        <Input name="panNumber" placeholder="ABCDE1234F" value={formData.panNumber} onChange={handleChange} />
        {errors.panNumber && <p className="text-sm text-red-500">{errors.panNumber}</p>}
        <p className="text-sm text-muted-foreground">Enter your valid PAN card number</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Event Name</label>
        <Input name="eventName" placeholder="Tree Planting Drive" value={formData.eventName} onChange={handleChange} />
        {errors.eventName && <p className="text-sm text-red-500">{errors.eventName}</p>}
        <p className="text-sm text-muted-foreground">Give your event a meaningful name</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Required Members</label>
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            name="requiredMembers"
            min={1}
            value={formData.requiredMembers}
            onChange={handleChange}
          />
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        {errors.requiredMembers && <p className="text-sm text-red-500">{errors.requiredMembers}</p>}
        <p className="text-sm text-muted-foreground">Number of volunteers needed for the event</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full pl-3 text-left font-normal ${!formData.startDate && "text-muted-foreground"}`}
              >
                {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full pl-3 text-left font-normal ${!formData.endDate && "text-muted-foreground"}`}
              >
                {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Create Event
      </Button>
    </form>
  )
}

