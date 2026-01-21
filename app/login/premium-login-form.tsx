"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import PremiumPattern from "@/components/premium-pattern"
import PremiumShapes from "./premium-shapes"
import DecorativeIcons from "./decorative-icons"
import DecorativeShapes from "./decorative-shapes" 
import CornerDecorations from "./corner-decorations"
import PremiumCard from "./premium-card"
import "./premium-login.css"

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackground = dynamic(
  () => import('@/components/particles-background-wrapper').then(mod => mod.ParticlesBackground),
  { ssr: false }
)

function PremiumLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

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
        if (rememberMe) {
          localStorage.setItem('rememberLogin', 'true')
        }
        
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Email input handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // Password input handler
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col justify-center items-center relative overflow-hidden">
      {/* Enhanced backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-emerald-50/50 to-white"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.07)_0%,transparent_65%)]"></div>
      <div className="spotlight"></div>
      
      {/* Premium pattern background */}
      <PremiumPattern opacity={0.07} color="#047857" />
      
      {/* Corner decorations */}
      <CornerDecorations />
      
      {/* Animated background shapes */}
      <PremiumShapes />
      
      {/* Decorative icons */}
      <DecorativeIcons />
      
      {/* Animated shapes */}
      <DecorativeShapes />
      
      {/* Particles for depth - lower z-index to ensure it doesn't block inputs */}
      {isClient && (
        <div className="particles-container">
          <ParticlesBackground 
            theme="deepEmerald" 
            density="high"
            mobileDensity="medium"
            speed="slow"
            mobileSpeed="slow"
            desktopOpacity={0.4}
            mobileOpacity={0.3}
            pageBackground="light" 
            zIndex={-1}
          />
        </div>
      )}
      
      {/* Login card centered on the screen */}
      <motion.div 
        className="container relative max-w-md mx-auto px-4 py-10 z-10" 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* App branding */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg mb-4 animated-gradient">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8 text-white"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-emerald-800 mb-1">
            Welcome to Startup Ecosystem
          </h2>
          <motion.p 
            className="text-slate-500 mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block">Sign in to access your </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="inline-block text-emerald-600 font-medium"
            >
              analytics dashboard
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 overflow-hidden relative form-card">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-100/30 via-transparent to-transparent opacity-70"></div>
            {error && (
              <Alert variant="destructive" className="mb-0 rounded-t-2xl rounded-b-none border-0">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form className="p-6 space-y-5 form-container" onSubmit={handleSubmit}>
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-emerald-800 font-medium block mb-1.5">
                  Email address
                </Label>
                <div className="relative input-wrapper">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 input-icon" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="login-field login-input pl-10 bg-white/70 border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mb-1.5">
                  <Label htmlFor="password" className="text-emerald-800 font-medium">
                    Password
                  </Label>
                </div>
                <div className="relative input-wrapper">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 input-icon" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-field login-input pl-10 pr-10 bg-white/70 border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="text-emerald-600 focus:ring-emerald-600/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                >
                  Remember me for 30 days
                </label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-11 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 glow-effect animated-gradient"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>


      </motion.div>
    </div>
  )
}

export default PremiumLoginForm
