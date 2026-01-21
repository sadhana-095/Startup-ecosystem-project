"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import PremiumPattern from "@/components/premium-pattern"
import "./premium-login.css"
import "./input-fixes.css"

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackground = dynamic(
  () => import('@/components/particles-background-wrapper').then(mod => mod.ParticlesBackground),
  { ssr: false }
)

export default function FixedLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

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
      return;
    }

    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to your authentication endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Only set localStorage on client-side
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true')
        if (rememberMe) {
          localStorage.setItem('rememberLogin', 'true')
        }
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
    <div className="flex min-h-screen w-full flex-col justify-center items-center relative">
      {/* Main background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white"></div>
      
      {/* Particles background at lowest z-index */}
      {isClient && (
        <div className="particles-container">
          <ParticlesBackground 
            theme="deepEmerald" 
            density="high"
            desktopOpacity={0.4}
            pageBackground="light" 
            zIndex={-1}
          />
        </div>
      )}
      
      {/* Login form card - with high z-index */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6">
        <div className="backdrop-blur-md bg-white/95 rounded-xl shadow-2xl border border-emerald-100/50 overflow-hidden form-card">
          <div className="spotlight"></div>
          <div className="text-center pt-6 mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg mb-4 animated-gradient">
              <span className="text-2xl font-bold text-white">SE</span>
            </div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              Welcome to Startup Ecosystem
            </h2>
            <p className="text-slate-600">
              Sign in to access your analytics dashboard
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-0 rounded-none border-0">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="px-6 pb-6 space-y-5 form-container" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-emerald-800 font-medium block mb-1.5">
                Email address
              </Label>
              <div className="relative input-wrapper">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 input-icon" />
                {/* Replace the Input component with a direct HTML input for better control */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-emerald-100 px-3 py-2 text-base pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-gray-900"
                  style={{
                    color: '#333',
                    backgroundColor: 'white',
                    opacity: 1
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5">
                <Label htmlFor="password" className="text-emerald-800 font-medium">
                  Password
                </Label>
              </div>
              <div className="relative input-wrapper">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 input-icon" />
                {/* Replace the Input component with a direct HTML input for better control */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-emerald-100 px-3 py-2 text-base pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-gray-900 visible-input"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle text-slate-400 hover:text-emerald-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="text-emerald-600 data-[state=checked]:bg-emerald-600"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-slate-600"
              >
                Remember me for 30 days
              </label>
            </div>

            <div>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-11 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 shimmer shadow-lg shadow-emerald-500/20 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}
