"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      router.replace('/login')
    }
  }, [router])

  // Only render children if logged in
  // We'll use client-side rendering to check auth status
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      return null // Don't render dashboard content if user is not logged in
    }
  }

  return <>{children}</>
}
