"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"

type NavItem = {
  name: string;
  href: string;
};

const commonNavigation: NavItem[] = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
]

const authenticatedNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  ...commonNavigation
]

const unauthenticatedNavigation: NavItem[] = [
  ...commonNavigation
]

const loginPageNavigation: NavItem[] = [
  { name: "Home", href: "/" },
]

export default function EnhancedNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(status)
    }

    checkLoginStatus()
    window.addEventListener('loginStatusChanged', checkLoginStatus)

    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/login')
  }

  // Only show Home button on the login page
  const isLoginPage = pathname === '/login' || pathname.startsWith('/login/')
  const navigation = isLoggedIn 
    ? authenticatedNavigation 
    : isLoginPage ? loginPageNavigation : unauthenticatedNavigation

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="-m-1.5 p-1.5 flex items-center gap-2 premium-transition group">
            <span className="sr-only">Startup Ecosystem Explorer</span>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold premium-transition group-hover:shadow-md group-hover:scale-105 relative overflow-hidden">
              <span className="text-sm font-bold text-white relative z-10">SE</span>
              <div className="absolute inset-0 bg-primary/40 rounded-full opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-25 transition-all duration-500"></div>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 animate-spin-slow opacity-30"></div>
            </div>
            <span className="font-bold text-base gradient-text">Startup Explorer</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground premium-transition hover:bg-muted"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium premium-transition relative py-2 ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-primary'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isLoggedIn && (
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="premium-transition flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background/90 backdrop-blur-md px-6 py-6 sm:max-w-sm slide-in-right">
          <div className="flex items-center justify-between">
            <Link href={isLoggedIn ? "/dashboard" : "/"} className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Startup Ecosystem Explorer</span>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold relative overflow-hidden">
                <span className="text-sm font-bold text-white relative z-10">SE</span>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 animate-spin-slow opacity-30"></div>
              </div>
              <span className="font-bold text-base gradient-text">Startup Explorer</span>
            </Link>
            <button 
              type="button" 
              className="-m-2.5 rounded-md p-2.5 premium-transition hover:bg-muted" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium premium-transition ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn && (
                  <Button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }} 
                    variant="outline" 
                    className="w-full premium-transition flex items-center justify-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
