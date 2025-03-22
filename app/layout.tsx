import "./globals.css"
import { Space_Grotesk, Sora } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata = {
  title: "Chitransh",
  description: "Personal Website of Chitransh"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sora.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-background text-gray-900 dark:text-gray-100 transition-all-300 font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="pt-20 animate-fade-in-up">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'