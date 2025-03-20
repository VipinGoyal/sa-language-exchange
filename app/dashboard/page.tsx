"use client"

import { useState, useEffect } from "react"
import { LanguagePartnerCard } from "@/components/language-partner-card"
import { UpcomingSessionCard } from "@/components/upcoming-session-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demonstration
const partners = [
  {
    id: "1",
    name: "Maria Rodriguez",
    nativeLanguage: "Spanish",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    availability: "Evenings & Weekends",
  },
  {
    id: "2",
    name: "Hiroshi Tanaka",
    nativeLanguage: "Japanese",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    availability: "Mornings",
  },
  {
    id: "3",
    name: "Sophie Dubois",
    nativeLanguage: "French",
    learningLanguage: "German",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    availability: "Weekends",
  },
  {
    id: "4",
    name: "Li Wei",
    nativeLanguage: "Mandarin",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    availability: "Evenings",
  },
]

const upcomingSessions = [
  {
    id: "1",
    partnerName: "Maria Rodriguez",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-22T14:00:00",
    duration: 30,
    language: "Spanish",
  },
  {
    id: "2",
    partnerName: "Hiroshi Tanaka",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-24T09:00:00",
    duration: 45,
    language: "Japanese",
  },
]

export default function Dashboard() {
  const [username, setUsername] = useState("User")

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.email) {
        const name = user.email.split("@")[0]
        setUsername(name.charAt(0).toUpperCase() + name.slice(1))
      }
    }
  }, [])

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Welcome back, {username}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {partners.map((partner) => (
                  <LanguagePartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-6">
              <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">Your favorite language partners will appear here.</p>
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-6">
              <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">Your recently contacted language partners will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled language practice sessions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => <UpcomingSessionCard key={session.id} session={session} />)
              ) : (
                <p className="text-muted-foreground text-center py-4">No upcoming sessions</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your language learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Spanish</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">French</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

