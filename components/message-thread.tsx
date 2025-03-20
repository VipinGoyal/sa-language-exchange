"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip } from "lucide-react"

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

interface Thread {
  conversationId: string
  user: {
    id: string
    name: string
    avatarUrl?: string
    status: "online" | "offline"
  }
  messages: Message[]
}

interface MessageThreadProps {
  thread: Thread
}

export function MessageThread({ thread }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(thread.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // Add the new message to the thread
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])

    // Clear the input
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

  const initials = thread.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{thread.user.name}</h3>
          <p className="text-xs text-muted-foreground">{thread.user.status === "online" ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
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

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" size="icon" variant="ghost" className="shrink-0" aria-label="Attach file">
            <Paperclip className="h-5 w-5" />
          </Button>
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

