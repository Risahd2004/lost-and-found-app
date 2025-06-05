/** @jsxImportSource react */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface Item {
  id: string
  title: string
  category: string
  location: string
  date: string
  status: "pending" | "claimed" | "resolved"
  image?: string
}

export default function LostItems() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Mock data for lost items
  const lostItems: Item[] = [
    {
      id: "1",
      title: "Blue Backpack",
      category: "Bags",
      location: "Library, 2nd Floor",
      date: "2023-05-28",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "2",
      title: "MacBook Pro",
      category: "Electronics",
      location: "Computer Lab",
      date: "2023-05-27",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "3",
      title: "Water Bottle",
      category: "Personal Item",
      location: "Gym",
      date: "2023-05-26",
      status: "claimed",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "4",
      title: "Student ID Card",
      category: "ID/Cards",
      location: "Main Hall",
      date: "2023-05-25",
      status: "resolved",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "5",
      title: "Textbook - Introduction to Computer Science",
      category: "Books",
      location: "Classroom 101",
      date: "2023-05-24",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "6",
      title: "Wireless Earbuds",
      category: "Electronics",
      location: "Student Center",
      date: "2023-05-23",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "7",
      title: "Glasses in Black Case",
      category: "Accessories",
      location: "Cafeteria",
      date: "2023-05-22",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: "8",
      title: "Car Keys with Red Keychain",
      category: "Keys",
      location: "Parking Lot",
      date: "2023-05-21",
      status: "resolved",
      image: "/placeholder.svg?height=100&width=100"
    }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
    
    if (!auth) {
      router.push("/auth/signin");
    }
    
    setIsLoading(false);
  }, [router]);

  // Filter items based on search term and category
  const filteredItems = lostItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lost Items</h1>
          <p className="text-gray-500">Browse all reported lost items</p>
        </div>
        <Link href="/report">
          <Button>Report Lost Item</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, location..."
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
              <SelectItem value="bags">Bags & Luggage</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="id/cards">ID Cards & Documents</SelectItem>
              <SelectItem value="keys">Keys</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
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
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  item.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                  item.status === "claimed" ? "bg-blue-100 text-blue-800" : 
                  "bg-green-100 text-green-800"
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
                <img 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
