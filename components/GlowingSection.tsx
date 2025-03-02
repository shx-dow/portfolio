"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface GlowingSectionProps {
  children: React.ReactNode
  className?: string
  delaySeconds?: number // Added delay prop with default value
}

export const GlowingSection = ({ 
  children, 
  className = "",
  delaySeconds = 1 // Default 1 second delay
}: GlowingSectionProps) => {
  const [isInView, setIsInView] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 300, y: 300 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set isInView to true when element enters viewport
        setIsInView(entry.isIntersecting)
        
        // If element is no longer in view, reset glowing state
        if (!entry.isIntersecting) {
          setIsGlowing(false)
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  // Set glowing state after delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    if (isInView) {
      timeoutId = setTimeout(() => {
        setIsGlowing(true)
      }, delaySeconds * 1000)
    }
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isInView, delaySeconds])
  
  // Animate glow position when glowing
  useEffect(() => {
    if (!isGlowing) return
    
    let animationFrameId: number
    let angle = 0
    
    const animateGlow = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) * 0.3
      
      // Calculate new position in a circular motion
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      setGlowPosition({ x, y })
      
      // Increment angle for next frame
      angle += 0.01
      if (angle > Math.PI * 2) angle = 0
      
      animationFrameId = requestAnimationFrame(animateGlow)
    }
    
    animateGlow()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isGlowing])

  return (
    <motion.div
      ref={sectionRef}
      className={`relative rounded-2xl ${className}`}
      initial={{ 
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: isDark ? 'rgba(17, 51, 102, 0.1)' : 'rgba(232, 218, 214, 0.2)'
      }}
      animate={{
        backgroundColor: isDark 
          ? isGlowing ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'
          : isGlowing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: isDark
          ? isGlowing ? 'rgba(17, 51, 102, 0.5)' : 'rgba(17, 51, 102, 0.1)'
          : isGlowing ? 'rgba(232, 218, 214, 0.4)' : 'rgba(232, 218, 214, 0.2)',
        boxShadow: isGlowing 
          ? isDark
            ? '0 0 20px rgba(17, 51, 102, 0.3), inset 0 0 20px rgba(17, 51, 102, 0.2)'
            : '0 0 20px rgba(188, 182, 203, 0.2), inset 0 0 20px rgba(188, 182, 203, 0.1)'
          : 'none'
      }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Glow effect following animated position */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        animate={{
          opacity: isGlowing ? 0.15 : 0,
          background: isDark
            ? `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(17, 51, 102, 0.4), transparent 40%)`
            : `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(188, 182, 203, 0.3), transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}