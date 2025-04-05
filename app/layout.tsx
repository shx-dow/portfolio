import "./globals.css"
import { JetBrains_Mono, Inconsolata } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const inconsolata = Inconsolata({ subsets: ["latin"], weight: ["400", "500"] });

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
    <html lang="en" className={inconsolata.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-background text-gray-900 dark:text-gray-100 transition-all-300 font-sans">
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="pt-20 animate-fade-in-up">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'