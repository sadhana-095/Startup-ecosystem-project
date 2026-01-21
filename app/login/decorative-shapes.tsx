"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface DecorativeShapesProps {
  className?: string
}

const DecorativeShapes: React.FC<DecorativeShapesProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Top right blob */}
      <motion.div 
        className="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-400/5 blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: [0, 0.4, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />

      {/* Bottom left blob */}
      <motion.div 
        className="absolute -bottom-[10%] -left-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-emerald-600/10 to-emerald-300/5 blur-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.2, 0.9],
          opacity: [0, 0.3, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />

      {/* Small floating circle */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-4 h-4 rounded-full bg-emerald-400/30 shadow-lg shadow-emerald-400/20"
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      {/* Medium floating circle */}
      <motion.div
        className="absolute bottom-[25%] right-[18%] w-6 h-6 rounded-full bg-emerald-500/30 shadow-lg shadow-emerald-500/20"
        initial={{ y: 0 }}
        animate={{ y: [10, -10, 10] }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      {/* Small square */}
      <motion.div
        className="absolute top-[35%] right-[25%] w-3 h-3 bg-emerald-400/30 shadow-lg shadow-emerald-400/20 rounded-sm"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      {/* Triangle shape */}
      <motion.div
        className="absolute bottom-[35%] left-[20%]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear" 
        }}
      >
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[15px] border-b-emerald-500/30 shadow-lg shadow-emerald-400/10" />
      </motion.div>
    </div>
  )
}

export default DecorativeShapes