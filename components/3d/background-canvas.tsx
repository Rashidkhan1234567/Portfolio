"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based particle animation as fallback
function CSSParticles({ isDarkMode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            isDarkMode ? "bg-purple-500/30" : "bg-blue-500/30"
          } animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function BackgroundCanvas() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Always use CSS fallback to avoid React Three Fiber issues
  return (
    <div className="fixed w-full h-full top-0 left-0 -z-10 opacity-60 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-secondary" />
      <CSSParticles isDarkMode={isDarkMode} />
    </div>
  )
}
