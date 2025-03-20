"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const partnerData = {
  id: "1",
  name: "Maria Rodriguez",
  avatarUrl: "/placeholder.svg?height=100&width=100",
  nativeLanguage: "Spanish",
  learningLanguage: "English",
  availability: [
    { day: "Monday", slots: ["9:00 AM", "10:00 AM", "5:00 PM"] },
    { day: "Wednesday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Saturday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
  ],
}

export default function SchedulePage({ params }: { params: { partnerId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [duration, setDuration] = useState<string>("30")
  const [topic, setTopic] = useState<string>("")

  // In a real app, you would fetch the partner data based on the ID
  const partner = partnerData

  const initials = partner.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !timeSlot || !duration || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to schedule a session.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this data to your API
    console.log("Scheduling session:", {
      partnerId: params.partnerId,
      date,
      timeSlot,
      duration,
      topic,
    })

    toast({
      title: "Session scheduled!",
      description: `Your session with ${partner.name} has been scheduled.`,
    })

    // Redirect to the sessions page
    router.push("/sessions")
  }

  // Get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!date) return []

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })
    const availabilityForDay = partner.availability.find((a) => a.day === dayOfWeek)

    return availabilityForDay?.slots || []
  }

  const availableTimeSlots = getAvailableTimeSlots()

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule a Session</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Language Partner</CardTitle>
              <CardDescription>Details about your language partner</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={partner.avatarUrl} alt={partner.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{partner.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p>Native: {partner.nativeLanguage}</p>
                <p>Learning: {partner.learningLanguage}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Choose a date and time for your language practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Select a date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })
                      return !partner.availability.some((a) => a.day === dayOfWeek)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Select a time slot</h3>
                  <Select
                    value={timeSlot}
                    onValueChange={setTimeSlot}
                    disabled={!date || availableTimeSlots.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {date && availableTimeSlots.length === 0 && (
                    <p className="text-sm text-muted-foreground">No time slots available for this date.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Session duration</h3>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Topic or focus area</h3>
                  <Textarea
                    placeholder="What would you like to practice during this session?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Schedule Session
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}

