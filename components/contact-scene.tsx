"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based contact network animation
function ContactNetwork({ isDarkMode }) {
  const nodes = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    radius: 80,
  }))

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Central hub */}
      <div
        className={`w-16 h-16 rounded-full ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-2 border-purple-500/60"
            : "bg-gradient-to-r from-blue-500/40 to-indigo-500/40 border-2 border-blue-500/60"
        } backdrop-blur-sm flex items-center justify-center z-10 animate-pulse`}
      >
        <div className={`w-8 h-8 rounded-full ${isDarkMode ? "bg-purple-500/80" : "bg-blue-500/80"}`} />
      </div>

      {/* Network nodes */}
      {nodes.map((node) => {
        const x = Math.cos(node.angle) * node.radius
        const y = Math.sin(node.angle) * node.radius

        return (
          <div key={node.id} className="absolute">
            {/* Connection line */}
            <div
              className={`absolute w-0.5 ${isDarkMode ? "bg-purple-400/30" : "bg-blue-400/30"} origin-left`}
              style={{
                left: "50%",
                top: "50%",
                width: `${node.radius}px`,
                height: "1px",
                transform: `translate(-50%, -50%) rotate(${node.angle}rad)`,
                transformOrigin: "0 50%",
              }}
            />

            {/* Node */}
            <div
              className={`absolute w-4 h-4 rounded-full ${
                isDarkMode ? "bg-pink-500/60" : "bg-indigo-500/60"
              } animate-pulse`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${node.id * 0.2}s`,
              }}
            />
          </div>
        )
      })}

      {/* Central "CONTACT" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white/60" : "text-gray-800/60"} animate-pulse mt-24`}>
          CONTACT
        </h2>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-purple-400/40" : "bg-blue-400/40"} floating`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ContactScene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return <ContactNetwork isDarkMode={isDarkMode} />
}
