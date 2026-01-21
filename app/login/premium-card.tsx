"use client"

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'outline' | 'subtle'
  withGlow?: boolean
  withHover?: boolean
  className?: string
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  variant = 'default',
  withGlow = false,
  withHover = true,
  className,
  ...props
}) => {
  // Define base and variant styles
  const baseStyles = "rounded-2xl overflow-hidden transition-all duration-300"
  
  const variantStyles = {
    default: "bg-white/90 backdrop-blur-md shadow-xl border border-emerald-100",
    glass: "bg-white/40 backdrop-blur-md border border-white/50 shadow-lg",
    outline: "bg-white/70 backdrop-blur-sm border-2 border-emerald-200 shadow-md",
    subtle: "bg-white/60 backdrop-blur-sm shadow-md"
  }
  
  const hoverStyles = withHover 
    ? "hover:shadow-2xl hover:transform hover:-translate-y-1 hover:border-emerald-200/80" 
    : ""
  
  const glowStyles = withGlow 
    ? "after:absolute after:inset-0 after:rounded-2xl after:opacity-0 after:transition-opacity after:duration-500 after:bg-gradient-to-r after:from-emerald-500/0 after:via-emerald-500/20 after:to-emerald-500/0 hover:after:opacity-100" 
    : ""
  
  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        glowStyles,
        "relative",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // @ts-ignore - motion.div props compatibility issue
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default PremiumCard
