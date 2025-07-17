"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based contact animation
function ContactAnimation({ isDarkMode }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background grid of subtle nodes */}
      <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-4 p-8 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400" : "bg-blue-400"} animate-pulse-random`}
            style={{ animationDelay: `${Math.random() * 5}s` }}
          />
        ))}
      </div>

      {/* Central pulsating element */}
      <div
        className={`relative w-40 h-40 rounded-full flex items-center justify-center z-10
          ${isDarkMode ? "bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-2 border-purple-500/60" : "bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border-2 border-blue-500/60"}
          backdrop-blur-sm animate-pulse-strong`}
      >
        <div
          className={`w-20 h-20 rounded-full ${isDarkMode ? "bg-purple-500/60" : "bg-blue-500/60"} animate-ping-slow`}
        />
        <div className={`absolute text-3xl font-bold ${isDarkMode ? "text-white/80" : "text-gray-800/80"}`}>
          CONNECT
        </div>
      </div>

      {/* Floating particles (can keep this for subtle movement) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-pink-400/40" : "bg-indigo-400/40"} floating`}
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
