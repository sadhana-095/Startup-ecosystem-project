import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface LoginButtonProps {
  isLoading: boolean
  className?: string
}

export function LoginButton({ isLoading, className }: LoginButtonProps) {
  return (
    <Button 
      type="submit" 
      disabled={isLoading} 
      className={`w-full h-11 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 glow-effect animated-gradient ${className}`}
      aria-live="polite"
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <span>Sign in</span>
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  )
}
