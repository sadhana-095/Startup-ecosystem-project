import type React from "react"
import { Manrope } from "next/font/google"
import "./globals.css"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"

const manrope = Manrope({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata = {
  title: "Startup Ecosystem Explorer | Premium Analytics Platform",
  description: "Discover and navigate the global startup ecosystem with premium analytics and insights",
  generator: 'v0.dev',
  keywords: 'startup, ecosystem, analytics, funding, investors, entrepreneurs',
  authors: [{ name: 'Startup Ecosystem Explorer Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={manrope.variable}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <EnhancedNavbar />
              <main className="flex-1">{children}</main>
              <EnhancedFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
