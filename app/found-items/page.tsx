"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Clock, ArrowRight } from "lucide-react"

interface Item {
  id: string
  title: string
  category: string
  location: string
  date: string
  status: "pending" | "claimed" | "resolved"
  image?: string
  description?: string
}

export default function FoundItems() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock data for found items
  const foundItems: Item[] = [
    {
      id: "f1",
      title: "iPhone 13 Pro",
      category: "Electronics",
      location: "Cafeteria, Table 5",
      date: "2023-05-28",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "Black iPhone 13 Pro with cracked screen protector",
    },
    {
      id: "f2",
      title: "Red Water Bottle",
      category: "Personal Item",
      location: "Gym, Locker Area",
      date: "2023-05-27",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "Stainless steel water bottle with university logo",
    },
    {
      id: "f3",
      title: "Student ID Card - John Smith",
      category: "ID/Cards",
      location: "Library, Study Room 3",
      date: "2023-05-26",
      status: "claimed",
      image: "/placeholder.svg?height=100&width=100",
      description: "Student ID card for John Smith, ID: 2021001234",
    },
    {
      id: "f4",
      title: "Black Leather Wallet",
      category: "Accessories",
      location: "Parking Lot B",
      date: "2023-05-25",
      status: "resolved",
      image: "/placeholder.svg?height=100&width=100",
      description: "Black leather wallet with multiple cards inside",
    },
    {
      id: "f5",
      title: "Wireless Earbuds Case",
      category: "Electronics",
      location: "Computer Lab 2",
      date: "2023-05-24",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "White AirPods case, earbuds missing",
    },
    {
      id: "f6",
      title: "Blue Umbrella",
      category: "Accessories",
      location: "Main Entrance",
      date: "2023-05-23",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "Compact blue umbrella with wooden handle",
    },
    {
      id: "f7",
      title: "Calculus Textbook",
      category: "Books",
      location: "Classroom 205",
      date: "2023-05-22",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "Calculus: Early Transcendentals, 8th Edition",
    },
    {
      id: "f8",
      title: "House Keys with Blue Keychain",
      category: "Keys",
      location: "Student Center",
      date: "2023-05-21",
      status: "claimed",
      image: "/placeholder.svg?height=100&width=100",
      description: "Set of 3 keys with blue university keychain",
    },
    {
      id: "f9",
      title: "Prescription Glasses",
      category: "Accessories",
      location: "Lecture Hall A",
      date: "2023-05-20",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "Black frame prescription glasses in brown case",
    },
    {
      id: "f10",
      title: "Laptop Charger",
      category: "Electronics",
      location: "Study Hall",
      date: "2023-05-19",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100",
      description: "MacBook Pro charger with USB-C connector",
    },
  ]

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated") === "true"
    setIsAuthenticated(auth)

    if (!auth) {
      router.push("/auth/signin")
    }

    setIsLoading(false)
  }, [router])

  // Filter items based on search term and category
  const filteredItems = foundItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Found Items</h1>
          <p className="text-gray-500">Browse all reported found items</p>
        </div>
        <Link href="/report">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Report Found Item</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, location, description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="id/cards">ID Cards & Documents</SelectItem>
              <SelectItem value="keys">Keys</SelectItem>
              <SelectItem value="personal item">Personal Items</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <div
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === "pending"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.status === "claimed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                  Found
                </div>
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                {item.description && <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>}
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
      )}

      {/* Statistics Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Found Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{foundItems.length}</div>
            <p className="text-xs text-muted-foreground">Items waiting to be claimed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claimed Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {foundItems.filter((item) => item.status === "claimed").length}
            </div>
            <p className="text-xs text-muted-foreground">Items claimed by owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {foundItems.filter((item) => item.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">Items successfully returned</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
