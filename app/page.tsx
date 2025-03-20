import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageFeatureCard } from "@/components/language-feature-card"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroSection />

      <section className="container py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground">
            Connect with native speakers around the world and practice your language skills through conversation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LanguageFeatureCard
            title="Find Language Partners"
            description="Search for native speakers of your target language who want to learn your native language."
            icon="Users"
          />
          <LanguageFeatureCard
            title="Schedule Sessions"
            description="Book conversation practice sessions at times that work for both of you."
            icon="Calendar"
          />
          <LanguageFeatureCard
            title="Exchange Messages"
            description="Chat with your language partners to coordinate and build rapport."
            icon="MessageSquare"
          />
        </div>
      </section>

      <section className="container py-8 bg-muted/50 rounded-lg">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start practicing?</h2>
          <p className="max-w-[85%] text-muted-foreground">
            Join thousands of language learners already improving their skills through conversation.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">Sign Up Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

