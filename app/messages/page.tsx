import { redirect } from "next/navigation"

export default function MessagesPage() {
  // Redirect to the first conversation
  redirect("/messages/1")
}

