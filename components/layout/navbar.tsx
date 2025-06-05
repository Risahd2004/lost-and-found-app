"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Menu, X, LogOut, Bell } from "lucide-react"
import { UserIcon } from "lucide-react"

interface UserType {
  name?: string
  email: string
  role: string
}

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (isAuthenticated) {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  // Don't show navbar on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">EduFind</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium ${pathname === "/dashboard" ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/lost-items"
                  className={`text-sm font-medium ${pathname === "/lost-items" ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Lost Items
                </Link>
                <Link
                  href="/found-items"
                  className={`text-sm font-medium ${pathname === "/found-items" ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Found Items
                </Link>
                <Link
                  href="/report"
                  className={`text-sm font-medium ${pathname === "/report" ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Report Item
                </Link>

                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium ${pathname === "/dashboard" ? "text-emerald-600" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/lost-items"
                    className={`text-sm font-medium ${pathname === "/lost-items" ? "text-emerald-600" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lost Items
                  </Link>
                  <Link
                    href="/found-items"
                    className={`text-sm font-medium ${pathname === "/found-items" ? "text-emerald-600" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Found Items
                  </Link>
                  <Link
                    href="/report"
                    className={`text-sm font-medium ${pathname === "/report" ? "text-emerald-600" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Report Item
                  </Link>
                  <Link
                    href="/profile"
                    className={`text-sm font-medium ${pathname === "/profile" ? "text-emerald-600" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="justify-start px-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
