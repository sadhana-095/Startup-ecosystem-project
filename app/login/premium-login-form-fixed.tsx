"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Mail, Lock } from "lucide-react"
import { LoginButton } from "./components/login-button"
import { PasswordToggle } from "./components/password-toggle"
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
        <ParticlesBackground 
          theme="deepEmerald" 
          density="high"
          mobileDensity="medium"
          speed="slow"
          mobileSpeed="slow"
          desktopOpacity={0.4}
          mobileOpacity={0.3}
          pageBackground="light" 
          zIndex={-1}  // Changed from 5 to -1 to prevent blocking inputs
        />
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
          <PremiumCard>
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg m-4 animated-gradient">
              <span className="text-2xl font-bold text-white">SE</span>
            </div>
          </PremiumCard>
          <motion.p 
            className="mt-3 text-slate-600 max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Access your{" "}
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
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 overflow-hidden relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-100/30 via-transparent to-transparent opacity-70"></div>
            {error && (
              <Alert variant="destructive" className="mb-0 rounded-t-2xl rounded-b-none border-0">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form className="p-6 space-y-5 relative z-20" onSubmit={handleSubmit}>  {/* Added z-20 to ensure it's above all backgrounds */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-emerald-800 font-medium block mb-1.5">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="login-field pl-10 bg-white/70 border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300 relative z-10"
                    style={{ position: 'relative', zIndex: 10 }}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mb-1.5">
                  <Label htmlFor="password" className="text-emerald-800 font-medium">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-field pl-10 pr-10 bg-white/70 border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300 relative z-10"
                    style={{ position: 'relative', zIndex: 10 }}
                  />
                  <PasswordToggle 
                    showPassword={showPassword}
                    onToggle={togglePasswordVisibility}
                  />
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
                <LoginButton isLoading={isLoading} />
              </motion.div>
            </form>
          </div>
        </motion.div>


      </motion.div>
    </div>
  )
}

export default PremiumLoginForm
