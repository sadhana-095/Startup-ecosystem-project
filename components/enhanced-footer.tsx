"use client"

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Startup Ecosystem Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
