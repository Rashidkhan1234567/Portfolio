import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import GlobalErrorHandler from "@/components/global-error-handler"
import BackgroundWrapper from "@/components/background-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Add display swap for better font loading
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap", // Add display swap for better font loading
})

export const metadata: Metadata = {
  title: "Muhammad Rashid Khan | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React.js, Next.js, Firebase, Node.js, MongoDB, Express.js, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {/* Global error handler */}
        <GlobalErrorHandler />

        <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={true} suppressHydrationWarning>
          {/* Global background canvas - now using the client component wrapper */}
          <BackgroundWrapper />

          <div className="flex min-h-screen flex-col">
            <Navbar />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
              <div className="flex-grow">{children}</div>
            </Suspense>
            <Footer />
          </div>

          {/* Analytics with proper Suspense boundary */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
