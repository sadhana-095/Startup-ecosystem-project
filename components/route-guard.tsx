"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (isLoggedIn) {
      // If logged in, redirect to dashboard
      router.replace('/dashboard')
    }
  }, [router])

  // Only render children if not logged in
  // We'll use client-side rendering to check auth status
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      return null // Don't render any content if user is logged in
    }
  }

  return <>{children}</>
}
