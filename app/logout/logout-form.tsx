"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LogoutForm() {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === "undefined") return

    // Perform logout process
    const timer = setTimeout(() => {
      // Clear auth state
      localStorage.setItem('isLoggedIn', 'false')
      
      // Dispatch event to update login state across components
      window.dispatchEvent(new Event('loginStatusChanged'))
    }, 500)

    // Set up countdown for auto-redirect
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">You've been logged out</h1>
        <p className="mt-4 text-base text-gray-500">
          Thank you for using the Startup Ecosystem Explorer. You will be redirected to the homepage in {countdown} seconds.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button asChild size="lg">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
