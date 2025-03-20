"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    email: "",
    password: "••••••••",
    notifications: {
      email: true,
      sessions: true,
      messages: true,
    },
  })

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData((prev) => ({
        ...prev,
        email: user.email || "",
      }))
    }
  }, [])

  const handleNotificationChange = (key: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    })
  }

  const handleChangePassword = () => {
    toast({
      title: "Password change requested",
      description: "Check your email for instructions to change your password.",
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 gap-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={userData.email} disabled />
              <p className="text-xs text-muted-foreground">To change your email, please contact support</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2">
                <Input id="password" type="password" value={userData.password} disabled />
                <Button variant="outline" onClick={handleChangePassword}>
                  Change
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={userData.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-reminders">Session reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming language sessions</p>
                  </div>
                  <Switch
                    id="session-reminders"
                    checked={userData.notifications.sessions}
                    onCheckedChange={(checked) => handleNotificationChange("sessions", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-messages">New message notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when you get new messages</p>
                  </div>
                  <Switch
                    id="new-messages"
                    checked={userData.notifications.messages}
                    onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="text-destructive hover:bg-destructive/10">
              Delete Account
            </Button>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

