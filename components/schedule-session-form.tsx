"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSessions } from "./session-context"

// Get today's date in YYYY-MM-DD format for validation
const today = new Date().toISOString().split("T")[0]

// Define the form schema with Zod
const formSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required")
    .refine((date) => date >= today, {
      message: "Date must be today or in the future",
    }),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  topic: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ScheduleSessionFormProps {
  partnerId: string
  partnerName: string
  language: string
}

export function ScheduleSessionForm({ partnerId, partnerName, language }: ScheduleSessionFormProps) {
  const router = useRouter()
  const { addSession } = useSessions()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      time: "",
      duration: "30",
      topic: "",
      notes: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true)

    // Create a date string from the date and time inputs
    const dateTimeString = `${values.date}T${values.time}:00`

    // Create a new session object
    const newSession = {
      partnerName,
      date: dateTimeString,
      duration: Number.parseInt(values.duration),
      language,
      topic: values.topic || `${language} practice session`,
      notes: values.notes || undefined,
    }

    // Add the session to the context
    addSession(newSession)

    // Redirect to sessions page after a short delay
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/sessions")
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Session with {partnerName}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" min={today} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What would you like to practice?" {...field} />
                  </FormControl>
                  <FormDescription>Specify what you'd like to focus on during this session.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional notes for this session" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Session"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

