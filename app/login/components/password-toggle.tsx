import { Eye, EyeOff } from "lucide-react"

interface PasswordToggleProps {
  showPassword: boolean
  onToggle: () => void
}

export function PasswordToggle({ showPassword, onToggle }: PasswordToggleProps) {
  return (
    <button 
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors z-20"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      )}
    </button>
  )
}
