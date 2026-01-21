"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"

const authenticatedNavigation = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Dashboard", href: "/dashboard" },
]

const unauthenticatedNavigation = [
  { name: "Home", href: "/" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check login status on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
      
      // Listen for login status changes
      const handleStorageChange = () => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
      }
      
      window.addEventListener('storage', handleStorageChange)
      // Custom event for same-tab updates
      window.addEventListener('loginStatusChanged', handleStorageChange)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('loginStatusChanged', handleStorageChange)
      }
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false')
    // Dispatch event to update login state across components
    window.dispatchEvent(new Event('loginStatusChanged'))
    // Redirect to logout page
    window.location.href = '/logout'
  }

  return (
    <header className="bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          {isLoggedIn ? (
            <Link href="/dashboard" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Startup Ecosystem Explorer</span>
              <div className="flex items-center gap-2 group/tooltip relative">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center group overflow-hidden shadow-md">
                  <span className="text-xs font-bold text-white relative z-10">SE</span>
                  <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-25 transition-all duration-500"></div>
                  <div className="absolute -top-3 -right-3 h-4 w-4 text-emerald-300 animate-bounce opacity-75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                      <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-10"></div>
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 animate-spin-slow opacity-30"></div>
                </div>
                <span className="text-xl font-bold">Startup Ecosystem Explorer</span>
                <div className="absolute top-full left-0 mt-1 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Go to Dashboard
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Startup Ecosystem Explorer</span>
              <div className="flex items-center gap-2 group/tooltip relative">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center group overflow-hidden shadow-md">
                  <span className="text-xs font-bold text-white relative z-10">SE</span>
                  <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-25 transition-all duration-500"></div>
                  <div className="absolute -top-3 -right-3 h-4 w-4 text-emerald-300 animate-bounce opacity-75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                      <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-10"></div>
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 animate-spin-slow opacity-30"></div>
                </div>
                <span className="text-xl font-bold">Startup Ecosystem Explorer</span>
                <div className="absolute top-full left-0 mt-1 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Explore the ecosystem
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {!isLoggedIn && unauthenticatedNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href ? "text-emerald-600" : "text-foreground hover:text-emerald-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn && authenticatedNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href ? "text-emerald-600" : "text-foreground hover:text-emerald-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            {isLoggedIn ? (
              <Link href="/dashboard" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Startup Ecosystem Explorer</span>
                <div className="flex items-center gap-2 group/tooltip relative">
                  <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center group overflow-hidden shadow-md">
                    <span className="text-xs font-bold text-white relative z-10">SE</span>
                    <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-25 transition-all duration-500"></div>
                    <div className="absolute -top-3 -right-3 h-4 w-4 text-emerald-300 animate-bounce opacity-75">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-10"></div>
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 animate-spin-slow opacity-30"></div>
                  </div>
                  <span className="text-xl font-bold">Startup Ecosystem Explorer</span>
                  <div className="absolute top-full left-0 mt-1 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Go to Dashboard
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Startup Ecosystem Explorer</span>
                <div className="flex items-center gap-2 group/tooltip relative">
                  <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center group overflow-hidden shadow-md">
                    <span className="text-xs font-bold text-white relative z-10">SE</span>
                    <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-25 transition-all duration-500"></div>
                    <div className="absolute -top-3 -right-3 h-4 w-4 text-emerald-300 animate-bounce opacity-75">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-10"></div>
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 animate-spin-slow opacity-30"></div>
                  </div>
                  <span className="text-xl font-bold">Startup Ecosystem Explorer</span>
                  <div className="absolute top-full left-0 mt-1 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Explore the ecosystem
                  </div>
                </div>
              </Link>
            )}
            <button type="button" className="-m-2.5 rounded-md p-2.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {!isLoggedIn && unauthenticatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === item.href ? "bg-emerald-50 text-emerald-600" : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn && authenticatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === item.href ? "bg-emerald-50 text-emerald-600" : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-2">
                {isLoggedIn ? (
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-muted flex items-center"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
