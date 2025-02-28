"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface GlowingSectionProps {
  children: React.ReactNode
  className?: string
}

export const GlowingSection = ({ 
  children, 
  className = "" 
}: GlowingSectionProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.div
      ref={sectionRef}
      className={`relative rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ 
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: isDark ? 'rgba(17, 51, 102, 0.1)' : 'rgba(232, 218, 214, 0.2)'
      }}
      animate={{
        backgroundColor: isDark 
          ? isHovered ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'
          : isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: isDark
          ? isHovered ? 'rgba(17, 51, 102, 0.5)' : 'rgba(17, 51, 102, 0.1)'
          : isHovered ? 'rgba(232, 218, 214, 0.4)' : 'rgba(232, 218, 214, 0.2)',
        boxShadow: isHovered 
          ? isDark
            ? '0 0 20px rgba(17, 51, 102, 0.3), inset 0 0 20px rgba(17, 51, 102, 0.2)'
            : '0 0 20px rgba(188, 182, 203, 0.2), inset 0 0 20px rgba(188, 182, 203, 0.1)'
          : 'none'
      }}
      transition={{ duration: 0.3 }}
      style={{
        border: '1px solid',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Glow effect following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          background: isDark
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(17, 51, 102, 0.4), transparent 40%)`
            : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(188, 182, 203, 0.3), transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}