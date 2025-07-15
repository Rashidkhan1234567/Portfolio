"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based DNA helix animation
function DNAHelix({ isDarkMode }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* DNA Helix Structure */}
      <div className="relative">
        {/* Left strand */}
        <div className="absolute left-0 top-0 w-2 h-64 flex flex-col justify-between">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`left-${i}`}
              className={`w-3 h-3 rounded-full ${isDarkMode ? "bg-purple-500/60" : "bg-blue-500/60"} animate-pulse`}
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `translateX(${Math.sin((i / 20) * Math.PI * 4) * 20}px)`,
              }}
            />
          ))}
        </div>

        {/* Right strand */}
        <div className="absolute right-0 top-0 w-2 h-64 flex flex-col justify-between">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`right-${i}`}
              className={`w-3 h-3 rounded-full ${isDarkMode ? "bg-cyan-500/60" : "bg-indigo-500/60"} animate-pulse`}
              style={{
                animationDelay: `${i * 0.1 + 0.5}s`,
                transform: `translateX(${Math.sin((i / 20) * Math.PI * 4 + Math.PI) * 20}px)`,
              }}
            />
          ))}
        </div>

        {/* Connecting lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute w-16 h-0.5 ${
              isDarkMode ? "bg-white/30" : "bg-gray-600/30"
            } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Central "ABOUT" text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white/80" : "text-gray-800/80"} animate-pulse`}>
            ABOUT
          </h2>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-purple-400/40" : "bg-blue-400/40"} floating`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function AboutScene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return <DNAHelix isDarkMode={isDarkMode} />
}
