import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduFind - Lost and Found for Educational Institutes",
  description: "A comprehensive lost and found system for educational institutes",
    generator: 'v0.dev',
    icons: {
        icon: 'data:,',
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
