"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageSquare, Calendar, User, Home } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: User,
  },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    href: "/sessions",
    label: "Sessions",
    icon: Calendar,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  // Simulate checking login status
  useEffect(() => {
    // Check if we're on a page that would be accessible only after login
    const loggedInPages = ["/dashboard", "/messages", "/sessions", "/profile", "/browse-speakers"]
    const shouldBeLoggedIn = loggedInPages.some((page) => pathname.startsWith(page))

    if (shouldBeLoggedIn) {
      // Get user data from localStorage
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        setIsLoggedIn(true)
        // Extract name from email if available, otherwise use default
        if (user.email) {
          const username = user.email.split("@")[0]
          // Capitalize first letter of username
          setUserName(username.charAt(0).toUpperCase() + username.slice(1))
        } else {
          setUserName("User")
        }
      } else {
        // If no user data but on a protected page, redirect to login
        // In a real app, you would handle this differently
        setIsLoggedIn(true)
        setUserName("User")
      }
    }
  }, [pathname])

  // Get user initials for avatar
  const getUserInitials = () => {
    return userName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Language Exchange</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === route.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account">Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                  <span className="font-bold text-xl">Language Exchange</span>
                </Link>

                {isLoggedIn && (
                  <div className="flex items-center gap-3 py-2 px-1">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">View profile</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <Button
                      key={route.href}
                      variant={pathname === route.href ? "default" : "ghost"}
                      className="justify-start"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href={route.href}>
                        <route.icon className="mr-2 h-5 w-5" />
                        {route.label}
                      </Link>
                    </Button>
                  ))}
                </div>

                {isLoggedIn ? (
                  <Button variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link href="/">Logout</Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" asChild onClick={() => setOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

