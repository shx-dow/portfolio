"use client"

import type React from "react"

import Link from "next/link"
import { ThemeSwitcher } from "./theme-switcher"
import { useEffect, useState } from "react"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100 // Offset for the navbar height

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of navbar + some padding
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full shadow-lg w-11/12 max-w-5xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mr-6 bg-gradient-to-r from-teal-400 to-purple-500 text-transparent bg-clip-text"
          >
            Chitransh
          </Link>
          <div className="flex items-center space-x-6">
            {["about", "skills", "projects"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => scrollToSection(e, section)}
                className={`capitalize text-sm hover:text-gray-900 dark:hover:text-white transition-colors ${
                  activeSection === section
                    ? "text-gray-900 dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {section}
              </a>
            ))}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}

