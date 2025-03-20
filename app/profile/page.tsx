"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "Language enthusiast passionate about learning Spanish and French. I enjoy traveling and experiencing different cultures.",
    nativeLanguage: "English",
    learningLanguages: ["Spanish", "French"],
    proficiency: {
      Spanish: "Intermediate",
      French: "Beginner",
    },
    availability: "Evenings and weekends",
    interests: "Travel, cooking, literature, music",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(userData)

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email) {
        const username = user.email.split("@")[0]
        // Capitalize first letter of username
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1)

        setUserData((prev) => ({
          ...prev,
          name: user.name || formattedName,
          email: user.email,
        }))

        setEditedData((prev) => ({
          ...prev,
          name: user.name || formattedName,
          email: user.email,
        }))
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setUserData(editedData)
    setIsEditing(false)

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const getUserInitials = () => {
    return userData.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Japanese",
    "Korean",
    "Mandarin",
    "Arabic",
  ]

  const proficiencyLevels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Fluent", "Native"]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{userData.email}</p>

              <div className="mt-6 w-full">
                <h3 className="font-medium text-left mb-2">Native Language</h3>
                <p className="text-left text-muted-foreground">{userData.nativeLanguage}</p>

                <h3 className="font-medium text-left mt-4 mb-2">Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.learningLanguages.map((lang) => (
                    <div key={lang} className="flex items-center text-sm">
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1">
                        {lang} - {userData.proficiency[lang as keyof typeof userData.proficiency]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>About Me</CardTitle>
                      <CardDescription>Share information about yourself with language partners</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>Save</Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={editedData.name} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={editedData.bio} onChange={handleInputChange} rows={4} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests">Interests</Label>
                        <Textarea
                          id="interests"
                          name="interests"
                          value={editedData.interests}
                          onChange={handleInputChange}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nativeLanguage">Native Language</Label>
                        <Select
                          value={editedData.nativeLanguage}
                          onValueChange={(value) => handleSelectChange("nativeLanguage", value)}
                        >
                          <SelectTrigger id="nativeLanguage">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language} value={language}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-medium mb-2">Bio</h3>
                        <p className="text-muted-foreground">{userData.bio}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Interests</h3>
                        <p className="text-muted-foreground">{userData.interests}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Availability</h3>
                        <p className="text-muted-foreground">{userData.availability}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language Preferences</CardTitle>
                  <CardDescription>Manage your language learning preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Learning Goals</h3>
                    <p className="text-muted-foreground">
                      Reach conversational fluency in Spanish by the end of the year
                    </p>
                    <p className="text-muted-foreground">Learn basic travel phrases in French</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Preferred Session Topics</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Daily conversations</li>
                      <li>Travel vocabulary</li>
                      <li>Cultural discussions</li>
                      <li>Professional networking</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Learning Style</h3>
                    <p className="text-muted-foreground">
                      Visual learner, prefers structured conversations with corrections
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
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
                      <Input id="password" type="password" value="••••••••" disabled />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Notifications</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email notifications</Label>
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="session-reminders">Session reminders</Label>
                      <input
                        type="checkbox"
                        id="session-reminders"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-messages">New message notifications</Label>
                      <input
                        type="checkbox"
                        id="new-messages"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

