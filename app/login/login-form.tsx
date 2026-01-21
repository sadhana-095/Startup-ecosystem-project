"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackground = dynamic(
  () => import('@/components/particles-background-wrapper').then(mod => mod.ParticlesBackground),
  { ssr: false }
)

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
    
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (isLoggedIn) {
        // Redirect to dashboard if already logged in
        router.replace('/dashboard')
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to your authentication endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Only set localStorage on client-side
      if (typeof window !== 'undefined') {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true')
        
        // Dispatch event to update login state across components
        window.dispatchEvent(new Event('loginStatusChanged'))
      }

      // Redirect to the dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      {/* Only render ParticlesBackground on the client */}
      {isClient && (
        <ParticlesBackground 
          theme="deepEmerald" 
          density="high"        // Increased from medium for better visibility
          mobileDensity="medium" // Increased from low for better visibility
          speed="medium"        // Increased from slow for more movement
          mobileSpeed="medium"  // Increased from slow for more movement
          desktopOpacity={0.6}  // Significantly increased from 0.25 for better visibility
          mobileOpacity={0.5}   // Significantly increased from 0.2 for better visibility
          pageBackground="light" 
          zIndex={5}            // Increased to ensure visibility
        />
      )}
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm relative z-10">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-emerald-800 drop-shadow-sm">
            Sign in to your account
          </h2>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-emerald-800 font-medium">Email address</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-emerald-200 py-2 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <div>
              <Label htmlFor="password" className="text-emerald-800 font-medium">Password</Label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-emerald-200 px-3 py-2 bg-white text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 shadow-md"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
