"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface GlowingSectionProps {
  children: React.ReactNode
  className?: string
  delaySeconds?: number
}

export const GlowingSection: React.FC<GlowingSectionProps> = ({ 
  children, 
  className = "",
  delaySeconds = 1
}) => {
  // Remove isInView state since we don't need it anymore
  const [isGlowing, setIsGlowing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const [glowPosition, setGlowPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }
    return { x: 0, y: 0 };
  });
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMounted(true)
  }, [])

  const shouldRenderGlow = isMounted && typeof window !== 'undefined'
  
  // Remove the intersection observer effect
  
  // Remove the isInView effect

  useEffect(() => {
    if (!isGlowing || !isMounted || typeof window === 'undefined') return
    
    let animationFrameId: number
    let angle = 0
    
    const animateGlow = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        animationFrameId = requestAnimationFrame(animateGlow)
        return
      }
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) * 0.3
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      setGlowPosition({ x, y })
      
      angle += 0.01
      if (angle > Math.PI * 2) angle = 0
      
      animationFrameId = requestAnimationFrame(animateGlow)
    }
    
    animateGlow()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isGlowing, isMounted])

  // Keep only the hover effect
  useEffect(() => {
    if (!isHovered || !isMounted) {
      setIsGlowing(false)
      return
    }
    
    setIsGlowing(true)
    
  }, [isHovered, isMounted])

  // Determine default background to avoid flicker during hydration
  const defaultBackground = isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'
  const defaultBorder = isDark ? 'rgba(230, 230, 250, 0.1)' : 'rgba(75, 0, 130, 0.2)'  // Light purple for dark theme, dark purple for light theme

  return (
    <motion.div
      ref={sectionRef}
      className={`relative rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ 
        backgroundColor: defaultBackground,
        borderColor: defaultBorder
      }}
      animate={{
        backgroundColor: isDark 
          ? isGlowing ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'
          : isGlowing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: isDark
          ? isGlowing ? 'rgba(235, 230, 250, 0.4)' : 'rgba(235, 230, 250, 0.1)'  // Slightly more purple tint
          : isGlowing ? 'rgba(75, 0, 130, 0.3)' : 'rgba(75, 0, 130, 0.15)',      // Reduced opacity for dark purple
        boxShadow: isGlowing && shouldRenderGlow
          ? isDark
            ? '0 0 12px rgba(235, 230, 250, 0.15), inset 0 0 12px rgba(235, 230, 250, 0.08)'  // Reduced glow intensity
            : '0 0 12px rgba(75, 0, 130, 0.12), inset 0 0 12px rgba(75, 0, 130, 0.06)'      // Reduced glow intensity
          : 'none'
      }}
      transition={{ duration: 0.3 }} // Faster transition for hover
      style={{
        border: '1px solid',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Only render glow effect when component is mounted and hovered */}
      {shouldRenderGlow && isGlowing && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.1, // Slightly reduced opacity
            background: isDark
              ? `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(235, 230, 250, 0.25), transparent 40%)`  // Adjusted color
              : `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(75, 0, 130, 0.15), transparent 40%)`     // Reduced opacity
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}