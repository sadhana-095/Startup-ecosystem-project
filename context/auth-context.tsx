"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in when the component mounts
  useEffect(() => {
    // In a real app, this would check for a token in localStorage, cookies, etc.
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    
    // Listen for login status changes
    const handleLoginStatusChange = () => {
      const updatedLoginStatus = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(updatedLoginStatus)
    }
    
    window.addEventListener('loginStatusChanged', handleLoginStatusChange)
    window.addEventListener('storage', handleLoginStatusChange)
    
    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange)
      window.removeEventListener('storage', handleLoginStatusChange)
    }
  }, [])

  const login = () => {
    // In a real app, this would set tokens, cookies, etc.
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
    window.dispatchEvent(new Event('loginStatusChanged'))
  }

  const logout = () => {
    // In a real app, this would clear tokens, cookies, etc.
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
    window.dispatchEvent(new Event('loginStatusChanged'))
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
