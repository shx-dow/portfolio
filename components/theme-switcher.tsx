"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-full transition-colors 
        hover:bg-[#EBE6FA] dark:hover:bg-[#2B2B3B]
        group focus:outline-none focus:ring-10 active:outline-none"
    >
      <Sun 
        className="h-[1.2rem] w-[1.2rem] rotate-270 scale-0 transition-all dark:-rotate-90 dark:scale-100 dark:text-[#E8DAD6] dark:group-hover:text-[#BCB6CB]" 
      />
      <Moon 
        className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-0 text-[#483D8B] group-hover:text-[#4B0082]" 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

