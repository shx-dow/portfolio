"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

// Client-only cursor glow component with configurable properties
const CursorGlow = ({
  glowSize = 400,         // Size of the glow in pixels
  glowOpacity = 0.15,     // Opacity of the glow (0-1)
  glowColor = "17, 51, 102", // RGB values for glow color
  falloffPercentage = 40  // How quickly the glow fades (percentage)
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  // Don't render anything until client-side
  if (!isMounted || !isDark) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(${glowSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, ${glowOpacity}), transparent ${falloffPercentage}%)`,
      }}
    />
  )
}

// Dynamically import to prevent SSR
const ClientOnlyCursorGlow = dynamic(() => Promise.resolve(CursorGlow), { ssr: false })

interface GlowingSectionProps {
  children: React.ReactNode
  className?: string
  delaySeconds?: number
}

export const GlowingSection = ({ 
  children, 
  className = "",
  delaySeconds = 1
}: GlowingSectionProps) => {
  // Rest of GlowingSection component remains the same
  const [isInView, setIsInView] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 300, y: 300 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isMounted, setIsMounted] = useState(false)
  
  // Set mounted state on client-side only
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  useEffect(() => {
    if (!isMounted) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        
        if (!entry.isIntersecting) {
          setIsGlowing(false)
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isMounted])
  
  useEffect(() => {
    if (!isInView) return
    
    let timeoutId: NodeJS.Timeout
    
    timeoutId = setTimeout(() => {
      setIsGlowing(true)
    }, delaySeconds * 1000)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isInView, delaySeconds])
  
  useEffect(() => {
    if (!isGlowing || !isMounted) return
    
    let animationFrameId: number
    let angle = 0
    
    const animateGlow = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
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
      {isMounted && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          animate={{
            opacity: isGlowing ? 0.15 : 0,
            background: isDark
              ? `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(17, 51, 102, 0.4), transparent 40%)`
              : `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(188, 182, 203, 0.3), transparent 40%)`
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

// Export a provider component that wraps the app with customizable cursor glow
export const GlowProvider = ({ 
  children,
  glowSize = 400,
  glowOpacity = 0.15,
  glowColor = "17, 51, 102",
  falloffPercentage = 40
}: { 
  children: React.ReactNode,
  glowSize?: number,
  glowOpacity?: number,
  glowColor?: string,
  falloffPercentage?: number
}) => {
  return (
    <>
      <ClientOnlyCursorGlow 
        glowSize={glowSize}
        glowOpacity={glowOpacity}
        glowColor={glowColor}
        falloffPercentage={falloffPercentage}
      />
      {children}
    </>
  )
}