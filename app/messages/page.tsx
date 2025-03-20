import { MessageList } from "@/components/message-list"
import { MessageThread } from "@/components/message-thread"

// Mock data for demonstration
const conversations = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Maria Rodriguez",
      avatarUrl: "/placeholder.svg?height=100&width=100",
      status: "online",
    },
    lastMessage: {
      text: "Looking forward to our session tomorrow!",
      timestamp: "2025-03-20T15:30:00",
      isRead: true,
    },
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Hiroshi Tanaka",
      avatarUrl: "/placeholder.svg?height=100&width=100",
      status: "offline",
    },
    lastMessage: {
      text: "Can we reschedule our session to next week?",
      timestamp: "2025-03-19T10:15:00",
      isRead: false,
    },
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Sophie Dubois",
      avatarUrl: "/placeholder.svg?height=100&width=100",
      status: "online",
    },
    lastMessage: {
      text: "I found a great resource for learning French idioms!",
      timestamp: "2025-03-18T20:45:00",
      isRead: true,
    },
  },
]

// Mock thread data for the first conversation
const activeThread = {
  conversationId: "1",
  user: {
    id: "1",
    name: "Maria Rodriguez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    status: "online",
  },
  messages: [
    {
      id: "1",
      senderId: "1",
      text: "Hola! How is your Spanish practice going?",
      timestamp: "2025-03-19T14:30:00",
    },
    {
      id: "2",
      senderId: "me",
      text: "Muy bien, gracias! I've been practicing every day.",
      timestamp: "2025-03-19T14:35:00",
    },
    {
      id: "3",
      senderId: "1",
      text: "That's great to hear! Do you want to focus on any specific topics in our next session?",
      timestamp: "2025-03-19T14:40:00",
    },
    {
      id: "4",
      senderId: "me",
      text: "I'd like to practice ordering food and making reservations if that's okay.",
      timestamp: "2025-03-19T14:45:00",
    },
    {
      id: "5",
      senderId: "1",
      text: "Perfect! We can role-play restaurant scenarios. Looking forward to our session tomorrow!",
      timestamp: "2025-03-19T15:30:00",
    },
  ],
}

export default function MessagesPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1 border rounded-lg overflow-hidden">
          <MessageList conversations={conversations} activeConversationId={activeThread.conversationId} />
        </div>
        <div className="md:col-span-2 border rounded-lg overflow-hidden">
          <MessageThread thread={activeThread} />
        </div>
      </div>
    </div>
  )
}

