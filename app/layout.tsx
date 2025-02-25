import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-background text-gray-900 dark:text-gray-100 transition-all-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="pt-20 animate-fade-in-up">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'