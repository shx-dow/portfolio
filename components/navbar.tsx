"use client"

import type React from "react"
import Link from "next/link"
import { ThemeSwitcher } from "./theme-switcher"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY

      // Calculate scroll progress (0 to 1), but reach 1 much quicker
      const progress = Math.min(scrollPosition / 100, 1)
      setScrollProgress(progress)

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
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
    setIsMenuOpen(false)
  }

  const navStyle = mounted ? {
    backgroundColor: theme === 'dark' 
      ? `rgb(0 0 0 / ${0.6 + scrollProgress * 0.2})`
      : `rgb(var(--background-rgb) / ${0.6 + scrollProgress * 0.2})`,
    backdropFilter: `blur(${scrollProgress * 8}px)`,
    borderRadius: `${scrollProgress * 9999}px`,
    transform: `translateY(${scrollProgress * 16}px) translateX(-50%)`,
    width: `${95 - scrollProgress * 25}%`,
    boxShadow: theme === 'dark'
      ? `0 ${scrollProgress * 8}px ${scrollProgress * 24}px rgba(17, 51, 102, ${scrollProgress * 0.3})`
      : `0 ${scrollProgress * 8}px ${scrollProgress * 24}px rgb(var(--shadow-rgb) / ${scrollProgress * 0.1})`,
    border: theme === 'dark'
      ? `${scrollProgress}px solid rgba(17, 51, 102, ${scrollProgress * 0.5})`
      : `${scrollProgress}px solid rgb(var(--border-rgb) / ${scrollProgress * 0.5})`,
  }
  :{};

  const navLinks = ["about", "skills", "projects"]

  return (
    <>
      <nav
        className="fixed z-50 transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2 top-0"
        style={navStyle}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mr-6"
            >
              Chitransh
            </Link>
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((section) => (
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
              </div>
              <ThemeSwitcher />
              <button
                className="md:hidden ml-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-white dark:bg-black transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <Link
            href="/"
            className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Chitransh
          </Link>
          <button
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-8 space-y-8">
          {navLinks.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => scrollToSection(e, section)}
              className={`capitalize text-lg hover:text-gray-900 dark:hover:text-white transition-colors ${
                activeSection === section
                  ? "text-gray-900 dark:text-white font-semibold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

