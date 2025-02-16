import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { BackgroundEffect } from "@/components/background-effect"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Chitransh - Personal Website",
  description: "Personal website of Chitransh, a B.Tech CSE student",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundEffect />
          <Navbar />
          <div className="pt-20 animate-fadeIn relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'