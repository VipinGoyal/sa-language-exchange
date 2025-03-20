"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ScheduleSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  // Get partner ID from query params
  const partnerId = searchParams.get("partnerId")

  useEffect(() => {
    // If no partner ID is provided, redirect to browse speakers
    if (!partnerId) {
      toast({
        title: "Partner selection required",
        description: "Please select a language partner to schedule a session with.",
        variant: "destructive",
      })
      router.push("/browse-speakers")
      return
    }

    setLoading(false)
  }, [partnerId, router, toast])

  const handleContinue = () => {
    router.push(`/schedule/${partnerId}`)
  }

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Schedule a Session</h1>

      <Card>
        <CardHeader>
          <CardTitle>Ready to schedule</CardTitle>
          <CardDescription>You're about to schedule a session with a language partner</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center">
            You've selected a language partner. Click continue to set up your session details.
          </p>
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

