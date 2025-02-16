"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const lines: { x: number; y: number; length: number; angle: number; speed: number }[] = []
    const lineCount = 20

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length
        ctx.lineTo(endX, endY)

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY)
        gradient.addColorStop(0, "rgba(64, 224, 208, 0.1)") // Teal
        gradient.addColorStop(1, "rgba(159, 122, 234, 0.1)") // Purple

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed

        if (line.x < 0 || line.x > canvas.width || line.y < 0 || line.y > canvas.height) {
          line.x = Math.random() * canvas.width
          line.y = Math.random() * canvas.height
          line.angle = Math.random() * Math.PI * 2
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

