"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion, Variants, useAnimation } from "framer-motion"

interface EnhancedPatternProps {
  className?: string
  patternType?: "dots" | "waves" | "circuit" | "bubbles" | "gradient-flow"
  patternColor?: string
  secondaryColor?: string
  patternOpacity?: number
  animationSpeed?: "slow" | "medium" | "fast"
  zIndex?: number
  interactive?: boolean
}

export const EnhancedPattern = ({
  className = "",
  patternType = "dots",
  patternColor,
  secondaryColor,
  patternOpacity = 0.3,
  animationSpeed = "medium",
  zIndex = -10,
  interactive = true,
}: EnhancedPatternProps) => {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const controls = useAnimation()

  // Memoize event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (interactive) {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })
      
      // Subtle follow animation
      const moveX = (clientX / window.innerWidth - 0.5) * 20
      const moveY = (clientY / window.innerHeight - 0.5) * 20
      
      controls.start({
        x: moveX,
        y: moveY,
        transition: { type: "spring", stiffness: 50, damping: 30 }
      })
    }
  }, [interactive, controls])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    // Reset position
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 50, damping: 30 } })
  }, [controls])
  
  // Initialize on client-side only
  useEffect(() => {
    setMounted(true)
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseenter', handleMouseEnter)
      window.addEventListener('mouseleave', handleMouseLeave)
    }
    
    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseenter', handleMouseEnter)
        window.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [interactive, handleMouseMove, handleMouseEnter, handleMouseLeave])

  // Don't render on server
  if (!mounted) return null

  // Get animation class based on speed
  const animationClass = useMemo(() => ({
    slow: "pattern-animate-slow",
    medium: "pattern-animate",
    fast: "pattern-animate-fast"
  })[animationSpeed], [animationSpeed])

  // Pattern-specific styles
  const patternStyles = useMemo(() => {
    const baseStyles = {
      zIndex,
      opacity: patternOpacity,
      ...(patternColor && { '--pattern-primary': patternColor }),
      ...(secondaryColor && { '--pattern-secondary': secondaryColor }),
    }

    return baseStyles
  }, [zIndex, patternOpacity, patternColor, secondaryColor])

  // Interactive motion variants
  const motionVariants: Variants = interactive ? {
    hover: {
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    initial: {
      scale: 1,
      filter: "brightness(1)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  } : {
    hover: {},
    initial: {}
  }

  return (
    <motion.div
      className={`pattern-base ${patternType} ${animationClass} ${interactive ? 'pattern-interactive' : ''} ${className}`}
      style={patternStyles as React.CSSProperties}
      animate={controls}
      variants={motionVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {patternType === "waves" && (
        <motion.div 
          className="pattern-wave-animate"
          animate={{
            x: [-30, 0, -30],
            transition: {
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut"
            }
          }}
        />
      )}
      
      {patternType === "bubbles" && (
        <motion.div 
          className="pattern-bubbles"
          animate={{
            y: [-20, 0, -20],
            transition: {
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut"
            }
          }}
        />
      )}
    </motion.div>
  )
}

export default EnhancedPattern
