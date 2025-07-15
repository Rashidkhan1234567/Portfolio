"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based contact animation
function ContactAnimation({ isDarkMode }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central element */}
      <div
        className={`w-24 h-24 rounded-full ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50"
            : "bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border-2 border-blue-500/50"
        } backdrop-blur-sm floating flex items-center justify-center`}
      >
        <div className={`w-12 h-12 rounded-full ${isDarkMode ? "bg-purple-500/50" : "bg-blue-500/50"} animate-pulse`} />
      </div>

      {/* Orbiting elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-4 h-4 rounded-full ${isDarkMode ? "bg-pink-500/60" : "bg-indigo-500/60"}`}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: `orbit 8s linear infinite`,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ContactCanvas() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return <ContactAnimation isDarkMode={isDarkMode} />
}
