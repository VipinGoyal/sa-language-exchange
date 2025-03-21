"use client"

import { useEffect, useState } from "react"
import { MessageList } from "@/components/message-list"
import { MessageThread } from "@/components/message-thread"
import { useMessages } from "@/components/message-context"

export default function MessagePage({ params }: { params: { id: string } }) {
  const { setActiveConversationId, threads } = useMessages()
  const [isLoading, setIsLoading] = useState(true)
  const id = params.id

  // Set the active conversation ID when the page loads
  useEffect(() => {
    // Ensure the conversation exists before setting it as active
    if (id && threads[id]) {
      setActiveConversationId(id)
    } else if (Object.keys(threads).length > 0) {
      // If the requested conversation doesn't exist, use the first available one
      setActiveConversationId(Object.keys(threads)[0])
    }
    setIsLoading(false)
  }, [id, threads, setActiveConversationId])

  if (isLoading) {
    return (
      <div className="container py-6 flex items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-muted-foreground">Loading conversation...</p>
      </div>
    )
  }

  return (
    <div className="container py-6 flex flex-col h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <MessageList />
        </div>
        <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
          <MessageThread />
        </div>
      </div>
    </div>
  )
}

