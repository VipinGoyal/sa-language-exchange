"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionCard } from "@/components/session-card"

// Mock data for demonstration
const upcomingSessions = [
  {
    id: "1",
    partnerName: "Maria Rodriguez",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-22T14:00:00",
    duration: 30,
    language: "Spanish",
    topic: "Restaurant conversations",
  },
  {
    id: "2",
    partnerName: "Hiroshi Tanaka",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-24T09:00:00",
    duration: 45,
    language: "Japanese",
    topic: "Travel vocabulary",
  },
]

const pastSessions = [
  {
    id: "3",
    partnerName: "Sophie Dubois",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-15T16:30:00",
    duration: 60,
    language: "French",
    topic: "Daily routines",
  },
  {
    id: "4",
    partnerName: "Li Wei",
    partnerAvatar: "/placeholder.svg?height=100&width=100",
    date: "2025-03-10T11:00:00",
    duration: 30,
    language: "Mandarin",
    topic: "Basic introductions",
  },
]

export default function SessionsPage() {
  const router = useRouter()

  const handleScheduleSession = () => {
    // Redirect to the browse speakers page to select a partner
    router.push("/browse-speakers")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button onClick={handleScheduleSession}>Schedule New Session</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6 space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => <SessionCard key={session.id} session={session} isPast={false} />)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">You have no upcoming sessions</p>
                    <Button onClick={handleScheduleSession}>Schedule a Session</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="past" className="mt-6 space-y-4">
              {pastSessions.length > 0 ? (
                pastSessions.map((session) => <SessionCard key={session.id} session={session} isPast={true} />)
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">You have no past sessions</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={new Date()} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

