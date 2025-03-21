import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { SessionProvider } from "@/components/session-context"
import { MessageProvider } from "@/components/message-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Language Exchange - Connect with Native Speakers",
  description: "Practice languages with native speakers through scheduled sessions and messaging",
  icons: {
    // Explicitly set to an empty object to prevent Next.js from looking for default icons
    icon: [],
    apple: [],
    shortcut: [],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add a link rel="icon" with href="data:," to prevent browsers from requesting favicon.ico */}
        <link rel="icon" href="data:," />
      </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <MessageProvider>
              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6">
                  <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      &copy; {new Date().getFullYear()} Language Exchange. All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
              <Toaster />
            </MessageProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'