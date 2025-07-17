"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// New CSS-based subtle grid pulse animation
function SubtleGridPulse({ isDarkMode }) {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background-secondary/50" />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-background">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`row-${i}`}
            className={`absolute h-px w-full grid-line-horizontal ${
              isDarkMode ? "bg-purple-500/10" : "bg-blue-500/10"
            }`}
            style={{
              top: `${(i / 19) * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`col-${i}`}
            className={`absolute w-px h-full grid-line-vertical ${isDarkMode ? "bg-purple-500/10" : "bg-blue-500/10"}`}
            style={{
              left: `${(i / 19) * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Central subtle glow */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-purple-500" : "bg-blue-500"
        } animate-pulse`}
      />
    </div>
  )
}

export default function HeroCanvas() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return <SubtleGridPulse isDarkMode={isDarkMode} />
}
