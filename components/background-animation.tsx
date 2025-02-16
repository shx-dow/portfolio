"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

    const lineCount = 3
    const lines: SVGPathElement[] = []

    for (let i = 0; i < lineCount; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("fill", "none")
      path.setAttribute("stroke-width", "2")
      path.setAttribute("opacity", "0.3")
      svg.appendChild(path)
      lines.push(path)
    }

    function updateLine(line: SVGPathElement, t: number, index: number) {
      const startX = Math.sin(t * 0.1) * width * 0.4 + width * 0.5
      const startY = Math.cos(t * 0.1) * height * 0.4 + height * 0.5
      let d = `M ${startX} ${startY}`

      for (let i = 0; i < 5; i++) {
        const x = Math.sin((t + i) * 0.5) * width * 0.4 + width * 0.5
        const y = Math.cos((t + i) * 0.5) * height * 0.4 + height * 0.5
        d += ` Q ${x} ${y}`
      }

      line.setAttribute("d", d)
      line.setAttribute("stroke", `hsl(${(index * 120 + t * 10) % 360}, 70%, 60%)`)
    }

    let t = 0
    function animate() {
      lines.forEach((line, i) => {
        updateLine(line, t + i * 2, i)
      })
      t += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 dark:opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    />
  )
}

