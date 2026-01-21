"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumShapesProps {
  className?: string
}

export const PremiumShapes: React.FC<PremiumShapesProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Abstract circle */}
      <motion.div 
        className="absolute top-[5%] right-[15%] w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-400/20 blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: [0, 0.7, 0.5]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />

      {/* Smaller circle */}
      <motion.div 
        className="absolute bottom-[10%] left-[10%] w-48 h-48 rounded-full bg-gradient-to-r from-emerald-300/20 to-emerald-600/10 blur-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.2, 0.9],
          opacity: [0, 0.6, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />

      {/* Larger circle */}
      <motion.div 
        className="absolute top-[30%] left-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/10 to-emerald-500/20 blur-3xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ 
          scale: [0.7, 1, 0.7],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />

      {/* Bottom right shape */}
      <motion.div 
        className="absolute -bottom-[5%] -right-[5%] w-80 h-80 rounded-full bg-gradient-to-l from-emerald-600/20 to-emerald-300/10 blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 0.8],
          opacity: [0, 0.7, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
    </div>
  )
}

export default PremiumShapes
