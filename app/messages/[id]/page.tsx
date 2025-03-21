"use client"

import { useEffect } from "react"
import { MessageList } from "@/components/message-list"
import { MessageThread } from "@/components/message-thread"
import { useMessages } from "@/components/message-context"

export default function MessagePage({ params }: { params: { id: string } }) {
  const { setActiveConversationId } = useMessages()
  const id = params.id

  // Set the active conversation ID when the page loads
  // We don't need to call markConversationAsRead here as it's handled in the context
  useEffect(() => {
    if (id) {
      setActiveConversationId(id)
    }
  }, [id, setActiveConversationId])

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

