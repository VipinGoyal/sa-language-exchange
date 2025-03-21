"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useMessages } from "./message-context"

export function MessageThread() {
  const { threads, activeConversationId, sendMessage } = useMessages()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Always call hooks at the top level, regardless of conditions
  useEffect(() => {
    if (activeConversationId && threads[activeConversationId]) {
      scrollToBottom()
    }
  }, [activeConversationId, threads])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeConversationId || newMessage.trim() === "") return

    sendMessage(activeConversationId, newMessage)
    setNewMessage("")
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Render a placeholder if there's no active conversation
  if (!activeConversationId || !threads[activeConversationId]) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    )
  }

  const thread = threads[activeConversationId]
  const initials = thread.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{thread.user.name}</h3>
            <p className="text-xs text-muted-foreground">{thread.user.status === "online" ? "Online" : "Offline"}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {thread.messages.map((message) => {
          const isMe = message.senderId === "me"

          return (
            <div key={message.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className="flex gap-2 max-w-[80%]">
                {!isMe && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div className={`rounded-lg p-3 ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatMessageTime(message.timestamp)}</p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            placeholder="Type a message..."
            className="min-h-10 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />
          <Button type="submit" size="icon" className="shrink-0" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

