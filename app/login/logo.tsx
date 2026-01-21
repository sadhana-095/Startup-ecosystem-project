"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  size?: number
  className?: string
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 64, 
  className = ""
}) => {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  }

  const pathVariants = {
    hidden: { 
      opacity: 0,
      pathLength: 0
    },
    visible: { 
      opacity: 1,
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  }

  const dotVariants = {
    hidden: { 
      opacity: 0,
      scale: 0
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 1.2
      }
    }
  }

  return (
    <motion.div 
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
      variants={iconVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="relative w-full h-full">
        {/* Gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 animated-gradient shadow-lg" />
        
        {/* Logo paths */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-full h-full p-[25%] text-white"
        >
          {/* Animated path */}
          <motion.path 
            d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
            variants={pathVariants}
          />
          
          {/* Connection dots */}
          <motion.circle cx="6" cy="6" r="0.5" fill="white" variants={dotVariants} />
          <motion.circle cx="18" cy="6" r="0.5" fill="white" variants={dotVariants} />
          <motion.circle cx="6" cy="18" r="0.5" fill="white" variants={dotVariants} />
          <motion.circle cx="18" cy="18" r="0.5" fill="white" variants={dotVariants} />
        </motion.svg>
        
        {/* Soft glow effect */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md -z-10" />
      </div>
    </motion.div>
  )
}

export default AnimatedLogo