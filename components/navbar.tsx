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
      // Separate scroll progress calculation for navbar animation
      const scrollPosition = window.scrollY
      const progress = Math.min(scrollPosition / 100, 1)
      setScrollProgress(progress)

      // Section detection using viewport middle
      const viewportMiddle = scrollPosition + window.innerHeight / 2
      const sections = document.querySelectorAll("section[id]")
      
      let currentSection = ""
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100 // Add offset for navbar
        const sectionBottom = sectionTop + section.clientHeight

        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
          currentSection = section.getAttribute("id") || ""
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    // Initial check
    handleScroll()

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
      ? `rgb(8 8 11 / ${0.6 + scrollProgress * 0.2})`    // Soft black/gray for dark theme
      : `rgb(250 248 254 / ${0.6 + scrollProgress * 0.2})`, // Soft purple-white for light theme
    backdropFilter: `blur(${scrollProgress * 8}px)`,
    borderRadius: `${scrollProgress * 9999}px`,
    transform: `translateY(${scrollProgress * 16}px) translateX(-50%)`,
    width: `${95 - scrollProgress * 25}%`,
    boxShadow: theme === 'dark'
      ? `0 0 ${scrollProgress * 15}px rgba(235, 230, 250, ${scrollProgress * 0.2}), 
         inset 0 0 ${scrollProgress * 10}px rgba(235, 230, 250, ${scrollProgress * 0.1})`
      : `0 0 ${scrollProgress * 15}px rgba(75, 0, 130, ${scrollProgress * 0.15}), 
         inset 0 0 ${scrollProgress * 10}px rgba(75, 0, 130, ${scrollProgress * 0.08})`,
    border: theme === 'dark'
      ? `${scrollProgress}px solid rgba(235, 230, 250, ${scrollProgress * 0.3})`
      : `${scrollProgress}px solid rgba(75, 0, 130, ${scrollProgress * 0.2})`,
  }
  :{};

  const navLinks = ["about", "skills", "projects"]

  return (
    <>
      <nav
        className="fixed z-40 transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2 top-0"
        style={navStyle}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-lg font-medium text-[#4B0082] dark:text-[#E8DAD6] hover:text-[#483D8B] dark:hover:text-[#BCB6CB] transition-colors mr-6"
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
                    className={`capitalize text-sm transition-colors ${
                      activeSection === section
                        ? "text-[#4B0082] dark:text-[#E8DAD6] font-semibold"
                        : "text-[#483D8B]/70 dark:text-[#BCB6CB]/70 hover:text-[#4B0082] dark:hover:text-[#E8DAD6]"
                    }`}
                  >
                    {section}
                  </a>
                ))}
              </div>
              {/* Added ml-2 for margin between nav links and theme switcher */}
              <div className="ml-2">
                <ThemeSwitcher />
              </div>
              <button
                className="md:hidden ml-4 text-[#483D8B]/70 dark:text-[#BCB6CB]/70 hover:text-[#4B0082] dark:hover:text-[#E8DAD6]"
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
        className={`fixed inset-0 z-50 bg-[#EBE6FA]/95 dark:bg-[#2B2B3B]/95 backdrop-blur-sm transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <Link
            href="/"
            className="text-lg text-[#4B0082] dark:text-[#E8DAD6] hover:text-[#483D8B] dark:hover:text-[#BCB6CB] transition-colors"
          >
            Chitransh
          </Link>
          <button
            className="text-[#483D8B]/70 dark:text-[#BCB6CB]/70 hover:text-[#4B0082] dark:hover:text-[#E8DAD6]"
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
              className={`capitalize text-lg transition-colors ${
                activeSection === section
                  ? "text-[#4B0082] dark:text-[#E8DAD6] font-semibold"
                  : "text-[#483D8B]/70 dark:text-[#BCB6CB]/70 hover:text-[#4B0082] dark:hover:text-[#E8DAD6]"
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

