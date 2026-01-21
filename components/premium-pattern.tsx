"use client"

import React from 'react'
import './premium-pattern.css'

interface PremiumPatternProps {
  className?: string
  opacity?: number
  color?: string
}

const PremiumPattern: React.FC<PremiumPatternProps> = ({
  className = '',
  opacity = 0.15,
  color = 'currentColor'
}) => {
  // Create an inline SVG with appropriate opacity
  return (
    <div className={`premium-pattern-container ${className}`}>
      <svg
        className="premium-pattern"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill={color} />
          </pattern>
          
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
          
          <pattern
            id="diagonalLines"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="30"
              y="0"
              x2="30"
              y2="60"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
          
          <pattern
            id="hexagons"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5) rotate(0)"
          >
            <rect width="56" height="100" fill="transparent" />
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
          
          <mask id="fadeMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <radialGradient id="fadeGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="black" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#fadeGradient)" />
          </mask>
        </defs>
        
        {/* Main pattern with opacity */}
        <g opacity={opacity}>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" mask="url(#fadeMask)" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalLines)" mask="url(#fadeMask)" opacity="0.3" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagons)" mask="url(#fadeMask)" opacity="0.4" />
        </g>
      </svg>
    </div>
  )
}

export default PremiumPattern
