"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguagePartnerCard } from "@/components/language-partner-card"

// Mock data for demonstration
const partners = [
  {
    id: "1",
    name: "Maria Rodriguez",
    nativeLanguage: "Spanish",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=MR",
    rating: 4.8,
    availability: "Evenings & Weekends",
  },
  {
    id: "2",
    name: "Hiroshi Tanaka",
    nativeLanguage: "Japanese",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=HT",
    rating: 4.9,
    availability: "Mornings",
  },
  {
    id: "3",
    name: "Sophie Dubois",
    nativeLanguage: "French",
    learningLanguage: "German",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=SD",
    rating: 4.7,
    availability: "Weekends",
  },
  {
    id: "4",
    name: "Li Wei",
    nativeLanguage: "Mandarin",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=LW",
    rating: 4.6,
    availability: "Evenings",
  },
  {
    id: "5",
    name: "Carlos Mendoza",
    nativeLanguage: "Spanish",
    learningLanguage: "French",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=CM",
    rating: 4.5,
    availability: "Afternoons",
  },
  {
    id: "6",
    name: "Aisha Khan",
    nativeLanguage: "Arabic",
    learningLanguage: "English",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=AK",
    rating: 4.9,
    availability: "Flexible",
  },
  {
    id: "7",
    name: "Paolo Rossi",
    nativeLanguage: "Italian",
    learningLanguage: "German",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=PR",
    rating: 4.7,
    availability: "Evenings",
  },
  {
    id: "8",
    name: "Yuki Sato",
    nativeLanguage: "Japanese",
    learningLanguage: "Spanish",
    avatarUrl: "/placeholder.svg?height=100&width=100&text=YS",
    rating: 4.8,
    availability: "Weekends",
  },
]

export default function BrowseSpeakersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState("")

  // Filter partners based on search and filters
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage = !selectedLanguage || partner.nativeLanguage === selectedLanguage
    const matchesLearningLanguage = !selectedLearningLanguage || partner.learningLanguage === selectedLearningLanguage
    const matchesAvailability =
      !selectedAvailability || partner.availability.toLowerCase().includes(selectedAvailability.toLowerCase())

    return matchesSearch && matchesLanguage && matchesLearningLanguage && matchesAvailability
  })

  // Handle scheduling with a partner
  const handleScheduleWithPartner = (partnerId: string) => {
    router.push(`/schedule/${partnerId}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Language Partners</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">
                  Search
                </label>
                <Input
                  id="search"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="native-language" className="text-sm font-medium">
                  Native Language
                </label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger id="native-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="learning-language" className="text-sm font-medium">
                  Learning Language
                </label>
                <Select value={selectedLearningLanguage} onValueChange={setSelectedLearningLanguage}>
                  <SelectTrigger id="learning-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="availability" className="text-sm font-medium">
                  Availability
                </label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="mornings">Mornings</SelectItem>
                    <SelectItem value="afternoons">Afternoons</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Partners</TabsTrigger>
              <TabsTrigger value="online">Online Now</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {filteredPartners.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPartners.map((partner) => (
                    <LanguagePartnerCard
                      key={partner.id}
                      partner={partner}
                      onSchedule={() => handleScheduleWithPartner(partner.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-lg">
                  <p className="text-muted-foreground">No language partners match your filters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="online" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.slice(0, 4).map((partner) => (
                  <LanguagePartnerCard
                    key={partner.id}
                    partner={partner}
                    onSchedule={() => handleScheduleWithPartner(partner.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.slice(2, 6).map((partner) => (
                  <LanguagePartnerCard
                    key={partner.id}
                    partner={partner}
                    onSchedule={() => handleScheduleWithPartner(partner.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

