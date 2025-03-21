"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionCard } from "@/components/session-card"
import { useSessions } from "@/components/session-context"
import { Button } from "@/components/ui/button"
import { useCustomToast } from "@/components/custom-toast"

export default function SessionsPage() {
  const { upcomingSessions, pastSessions } = useSessions()
  const { showToast } = useCustomToast()

  // Function to test toast
  const testToast = () => {
    showToast({
      title: "Custom Toast Test",
      description: "This is a test of our custom toast implementation.",
      duration: 5000,
      variant: "success",
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button variant="outline" onClick={testToast}>
          Test Toast
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">You have no upcoming sessions</p>
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
    </div>
  )
}

