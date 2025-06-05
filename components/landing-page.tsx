import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Bell } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Lost Something? Found Something?</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Our campus lost and found system helps connect lost items with their owners quickly and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Report Lost Item
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">
                  Report Found Item
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report</h3>
              <p className="text-gray-600">Report lost or found items with detailed descriptions and photos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Bell className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
              <p className="text-gray-600">Receive notifications when matching items are reported.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recover</h3>
              <p className="text-gray-600">Arrange for pickup or delivery of your lost items.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Findings</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full mb-2">
                      Found
                    </span>
                    <h3 className="font-semibold text-lg mb-1">Water Bottle</h3>
                    <p className="text-gray-600 text-sm mb-2">Found in Library, 2nd Floor</p>
                    <p className="text-gray-500 text-xs">Reported 2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">EduFind</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Educational Institute. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
