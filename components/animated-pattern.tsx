"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"

interface AnimatedPatternProps {
  className?: string
  patternType?: "dots" | "waves" | "circuit" | "bubbles"
  patternColor?: string
  patternOpacity?: number
  animationSpeed?: "slow" | "medium" | "fast"
  zIndex?: number
}

// Pattern configuration object
const patternConfig = {
  sizes: {
    mobile: {
      base: 18,
      dots: 2,
      waves: 2,
      circuit: 3,
      bubbles: 5
    },
    desktop: {
      base: 24,
      dots: 3,
      waves: 3,
      circuit: 4,
      bubbles: 8
    }
  },
  counts: {
    mobile: {
      dots: 30,
      waves: 6,
      circuit: 12,
      bubbles: 20
    },
    desktop: {
      dots: 60,
      waves: 8,
      circuit: 15,
      bubbles: 30
    }
  },
  speeds: {
    slow: { duration: 25, delay: 0.5 },
    medium: { duration: 20, delay: 0.3 },
    fast: { duration: 15, delay: 0.2 }
  }
}

export const AnimatedPattern = ({
  className = "",
  patternType = "dots",
  patternColor = "hsl(var(--pattern-primary))",
  patternOpacity = 0.3,
  animationSpeed = "medium",
  zIndex = 1,
}: AnimatedPatternProps) => {
  // State hooks
  const [mounted, setMounted] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Memoized values
  const { isMobile, elementConfig } = useMemo(() => {
    const isMobile = windowWidth < 768
    const deviceType = isMobile ? 'mobile' : 'desktop'
    const sizeConfig = patternConfig.sizes[deviceType]
    const counts = patternConfig.counts[deviceType]
    const speedConfig = patternConfig.speeds[animationSpeed]

    return {
      isMobile,
      elementConfig: {
        baseSize: sizeConfig.base,
        elementSize: sizeConfig[patternType],
        count: counts[patternType],
        duration: speedConfig.duration,
        delay: speedConfig.delay
      }
    }
  }, [windowWidth, patternType, animationSpeed])

  // Memoized pattern elements
  const patternElements = useMemo(() => {
    const elements = Array.from({ length: elementConfig.count }).map((_, i) => {
      const seed = i / elementConfig.count
      const left = `${(seed * 93 + Math.random() * 7)}%`
      const top = `${(seed * 93 + Math.random() * 7)}%`
      const size = elementConfig.baseSize * (0.5 + seed * 0.5)
      
      return { left, top, size, seed }
    })
    return elements
  }, [elementConfig])

  // Memoized wrapper class
  const wrapperClass = useMemo(() => {
    const zClasses = {
      [-2]: 'pattern-wrapper-z-2',
      [-1]: 'pattern-wrapper-z-1',
      1: 'pattern-wrapper-z1',
      2: 'pattern-wrapper-z2',
      3: 'pattern-wrapper-z3',
      4: 'pattern-wrapper-z4',
      5: 'pattern-wrapper-z5'
    }
    return `pattern-wrapper ${zClasses[zIndex as keyof typeof zClasses] || ''} ${className}`
  }, [zIndex, className])

  // Callbacks
  const checkWindowSize = useCallback(() => {
    const width = window.innerWidth
    setWindowWidth(width)
  }, [])

  const getPatternContent = useCallback(() => {
    switch (patternType) {
      case "dots":
        return (
          <div className="relative w-full h-full">
            {patternElements.map((element, i) => (
              <motion.div
                key={i}
                className="pattern-element pattern-dot"
                style={{
                  left: element.left,
                  top: element.top,
                  width: element.size,
                  height: element.size,
                  backgroundColor: patternColor,
                  opacity: patternOpacity * (0.5 + element.seed * 0.5),
                }}
                animate={{
                  y: [0, (element.seed * 20 - 10), 0],
                  x: [0, (element.seed * 20 - 10), 0],
                  scale: [1, 0.9 + element.seed * 0.3, 1],
                }}
                transition={{
                  duration: elementConfig.duration * (0.8 + element.seed * 0.4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.seed * elementConfig.delay,
                }}
              />
            ))}
          </div>
        )
        
      case "waves":
        return (
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: elementConfig.count }).map((_, i) => {
              const yPos = (i * (100 / elementConfig.count)) + (i * 5) % 7
              const xPos = (i * (100 / elementConfig.count)) + (i * 5) % 7
              const duration = elementConfig.duration * (0.8 + (i % 4) * 0.1)
              const opacity = patternOpacity * (0.7 + (i % 3) * 0.1)
              
              return (
                <React.Fragment key={i}>
                  <motion.div
                    className="pattern-line pattern-line-horizontal"
                    style={{
                      top: `${yPos}%`,
                      backgroundColor: patternColor,
                      opacity,
                    }}
                    animate={{
                      x: ["-30%", "0%", "-30%"]
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="pattern-line pattern-line-vertical"
                    style={{
                      left: `${xPos}%`,
                      backgroundColor: patternColor,
                      opacity: opacity * 0.7,
                    }}
                    animate={{
                      y: ["-30%", "0%", "-30%"]
                    }}
                    transition={{
                      duration: duration * 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </React.Fragment>
              )
            })}
          </div>
        )
        
      case "circuit":
        return (
          <div className="relative w-full h-full">
            {/* Horizontal lines */}
            {Array.from({ length: elementConfig.count }).map((_, i) => {
              const top = `${(i * 100) / elementConfig.count}%`
              const width = `${30 + Math.random() * 70}%`
              const left = `${Math.random() * (100 - 30)}%`
              const opacity = patternOpacity * (0.5 + Math.random() * 0.5)
              
              return (
                <motion.div
                  key={`h-${i}`}
                  className="pattern-line pattern-line-horizontal"
                  style={{
                    top,
                    left,
                    width,
                    backgroundColor: patternColor,
                    opacity,
                  }}
                  animate={{
                    opacity: [
                      opacity,
                      opacity * 1.6,
                      opacity
                    ]
                  }}
                  transition={{
                    duration: elementConfig.duration * (0.8 + Math.random() * 0.4),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5
                  }}
                />
              )
            })}
            
            {/* Connection dots */}
            {Array.from({ length: Math.floor(elementConfig.count / 3)}).map((_, i) => {
              const left = `${Math.random() * 100}%`
              const top = `${Math.random() * 100}%`
              const size = elementConfig.elementSize
              
              return (
                <motion.div
                  key={`dot-${i}`}
                  className="pattern-element pattern-dot"
                  style={{
                    left,
                    top,
                    width: size,
                    height: size,
                    backgroundColor: patternColor,
                    opacity: patternOpacity,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [
                      patternOpacity, 
                      patternOpacity * 1.5, 
                      patternOpacity
                    ]
                  }}
                  transition={{
                    duration: elementConfig.duration * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * elementConfig.duration
                  }}
                />
              )
            })}
          </div>
        )
      
      case "bubbles":
        return (
          <div className="relative w-full h-full">
            {Array.from({ length: elementConfig.count }).map((_, i) => {
              const left = `${Math.random() * 100}%`
              const top = `${Math.random() * 100}%`
              const size = elementConfig.elementSize * (0.5 + Math.random() * 0.5)
              const duration = elementConfig.duration * (0.5 + Math.random() * 0.5)
              
              return (
                <motion.div
                  key={i}
                  className="pattern-bubble"
                  style={{
                    left,
                    top,
                    width: size,
                    height: size,
                    borderColor: patternColor,
                    opacity: patternOpacity * 0.8,
                  }}
                  animate={{
                    y: [0, -50, -100],
                    scale: [0.2, 1, 1.5],
                    opacity: [0, patternOpacity, 0]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * elementConfig.duration,
                    repeatDelay: Math.random()
                  }}
                />
              )
            })}
          </div>
        )
        
      default:
        return null
    }
  }, [patternType, patternElements, patternColor, patternOpacity, elementConfig])

  // Effects
  useEffect(() => {
    setMounted(true)
    checkWindowSize()
    
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(checkWindowSize, 100)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [checkWindowSize])

  if (!mounted) return null

  return (
    <div className={wrapperClass}>
      {getPatternContent()}
    </div>
  )
}

export default AnimatedPattern
