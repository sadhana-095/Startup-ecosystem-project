"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface DecorativeIconsProps {
  className?: string
}

const DecorativeIcons: React.FC<DecorativeIconsProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Connection icon */}
      <motion.div
        className="absolute top-[10%] right-[15%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400/40">
          <path d="M18 16.016a3.98 3.98 0 0 1-3-1.36 3.98 3.98 0 0 1-6 0 3.98 3.98 0 0 1-6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M18 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </motion.div>
      
      {/* Graph icon */}
      <motion.div
        className="absolute top-[25%] left-[10%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/40">
          <path d="M21 21H4.6c-.56 0-1.1-.22-1.48-.62a2.1 2.1 0 0 1-.62-1.5V3" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 10L16 16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 16L16 10" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Idea icon */}
      <motion.div
        className="absolute bottom-[20%] right-[15%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-600/40">
          <path d="M12 18.5v-4.81" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.79 13.69c-1-.82-1.73-1.91-1.73-3.28 0-2.76 2.46-4.99 5.49-4.99 3.03 0 5.49 2.23 5.49 4.99 0 1.37-.73 2.46-1.73 3.28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.45 20a3.5 3.5 0 0 1-6.9 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 9.5c-.28-.64-1.32-1.5-3.5-1.5-2.18 0-3.22.86-3.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Chart icon */}
      <motion.div
        className="absolute bottom-[28%] left-[12%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/40">
          <path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.33 14.49L9.71 11.4c.34-.46.96-.53 1.38-.14l1.91 1.72c.44.4 1.1.33 1.44-.14l2.49-3.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Code icon */}
      <motion.div
        className="absolute top-[40%] right-[20%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400/40">
          <path d="M8 10L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 10L19 7L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 16L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Startup icon */}
      <motion.div
        className="absolute top-[60%] left-[8%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-600/40">
          <path d="M22 5.5c0-2-1-3-3-3h-4c-2 0-3 1-3 3v13c0 2 1 3 3 3h4c2 0 3-1 3-3v-13z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5.5c0-2-1-3-3-3H5c-2 0-3 1-3 3v5.29c0 2 1 3 3 3h4c2 0 3-1 3-3V5.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  )
}

export default DecorativeIcons