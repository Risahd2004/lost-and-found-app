"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MapPin, Clock, ArrowRight } from "lucide-react"

interface User {
  name?: string
  email: string
  role: string
}

interface Item {
  id: string
  type: "lost" | "found"
  title: string
  category: string
  location: string
  date: string
  status: "pending" | "claimed" | "resolved"
  image?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for dashboard
  const recentItems: Item[] = [
    {
      id: "1",
      type: "lost",
      title: "Blue Backpack",
      category: "Bag",
      location: "Library, 2nd Floor",
      date: "2023-05-28",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      type: "found",
      title: "iPhone 13",
      category: "Electronics",
      location: "Cafeteria",
      date: "2023-05-27",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      type: "lost",
      title: "Water Bottle",
      category: "Personal Item",
      location: "Gym",
      date: "2023-05-26",
      status: "claimed",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      type: "found",
      title: "Student ID Card",
      category: "ID/Cards",
      location: "Main Hall",
      date: "2023-05-25",
      status: "resolved",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/auth/signin")
      return
    }

    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || "User"}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/report">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Report Item
            </Button>
          </Link>
          <Link href="/lost-items">
            <Button variant="outline">View All Items</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lost Items</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
              <Search className="h-3 w-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Found Items</CardTitle>
            <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
              <Search className="h-3 w-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claimed Items</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
              <Search className="h-3 w-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="lost">Lost Items</TabsTrigger>
          <TabsTrigger value="found">Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === "lost" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.type === "lost" ? "Lost" : ""}
                  </div>
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/items/${item.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lost">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems
              .filter((item) => item.type === "lost")
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Lost
                    </div>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/items/${item.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="found">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems
              .filter((item) => item.type === "found")
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      Found
                    </div>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/items/${item.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
