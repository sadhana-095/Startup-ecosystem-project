"use client"

import React from 'react'
import './login.css'

interface CornerDecorationsProps {
  className?: string
}

const CornerSvg: React.FC<{ path: string } & React.SVGProps<SVGSVGElement>> = React.memo(({ path, className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-32 h-32 text-emerald-500/10 ${className}`}
    {...props}
  >
    <path d={path} fill="currentColor" />
  </svg>
))
CornerSvg.displayName = 'CornerSvg'

const CornerDecorations: React.FC<CornerDecorationsProps> = React.memo(({ className = "" }) => {
  return (
    <aside 
      aria-hidden="true" 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div className="corner-decorations">
        {/* Top left corner decoration */}
        <CornerSvg
          className="top-0 left-0"
          path="M0 0C0 55.2285 44.7715 100 100 100V0H0Z"
        />
        
        {/* Top right corner decoration */}
        <CornerSvg
          className="top-0 right-0"
          path="M100 0C100 55.2285 55.2285 100 0 100V0H100Z"
        />
        
        {/* Bottom left corner decoration */}
        <CornerSvg
          className="bottom-0 left-0"
          path="M0 100C0 44.7715 44.7715 0 100 0V100H0Z"
        />
        
        {/* Bottom right corner decoration */}
        <CornerSvg
          className="bottom-0 right-0"
          path="M100 100C100 44.7715 55.2285 0 0 0V100H100Z"
        />
      </div>
      
      {/* Dotted grid overlay */}
      <div className="absolute inset-0 dotted-grid-overlay" />
    </aside>
  )
})
CornerDecorations.displayName = 'CornerDecorations'

export default CornerDecorations
