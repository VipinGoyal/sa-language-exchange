"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to account page
    router.push("/account")
  }, [router])

  return (
    <div className="container py-8 flex items-center justify-center">
      <p>Redirecting to account settings...</p>
    </div>
  )
}

