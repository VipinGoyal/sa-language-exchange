import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MessageSquare, RotateCcw } from "lucide-react"

interface SessionProps {
  session: {
    id: string
    partnerName: string
    partnerAvatar?: string
    date: string
    duration: number
    language: string
    topic: string
  }
  isPast: boolean
}

export function SessionCard({ session, isPast }: SessionProps) {
  const initials = session.partnerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const sessionDate = new Date(session.date)
  const formattedDate = sessionDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime = sessionDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-semibold text-lg">{session.partnerName}</h3>
              <Badge variant="outline">{session.language}</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                {formattedTime} ({session.duration} minutes)
              </div>
              <p className="text-sm mt-2">
                <span className="font-medium">Topic:</span> {session.topic}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
        {isPast ? (
          <>
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/messages/${session.id}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href={`/schedule/${session.id}`}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reschedule
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/messages/${session.id}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href={`/sessions/${session.id}/join`}>
                <Video className="h-4 w-4 mr-2" />
                Join Session
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

