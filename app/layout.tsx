import "./globals.css"
import { JetBrains_Mono, Inconsolata } from "next/font/google"
import type { Metadata } from "next"
import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Analytics } from "@vercel/analytics/react"
import { cn } from "@/lib/utils"

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" })
const inconsolata = Inconsolata({ subsets: ["latin"], weight: ["400", "500"], display: "swap" })

export const metadata: Metadata = {
  title: "Chitransh",
  description: "Personal website of Chitransh — passionate 2nd-year CSE student exploring tech, AI, and design.",
  keywords: ["Chitransh", "Portfolio", "CSE Student", "Web Developer", "AI", "Tech", "UI/UX"],
  authors: [{ name: "Chitransh" }],
  creator: "Chitransh",
  metadataBase: new URL("https://chitransh9.vercel.app"), // Replace with your live domain
  openGraph: {
    title: "Chitransh | Portfolio",
    description: "Personal website of Chitransh — passionate 2nd-year CSE student exploring tech, AI, and design.",
    url: "https://chitransh9.vercel.app",
    siteName: "Chitransh Portfolio",
    images: [
      {
        url: "/og.png", // Place an image in your public folder
        width: 1200,
        height: 630,
        alt: "Chitransh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

// Generate Viewport export
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
    themeColor: "#0f172a", // Move themeColor here
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inconsolata.className} suppressHydrationWarning>
      <body
        className={cn(
          "bg-white dark:bg-background text-gray-100 transition-all duration-300 font-sans antialiased"
        )}
      >
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
          <Navbar />
          <main className="pt-20 px-4 max-w-5xl mx-auto animate-fade-in-up">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
