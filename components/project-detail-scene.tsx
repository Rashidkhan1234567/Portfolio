"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based project detail animation
function ProjectDetailAnimation({ slug, isDarkMode }) {
  // Generate colors based on project slug
  const generateColor = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = Math.abs(hash) % 360
    return isDarkMode ? `hsl(${hue}, 70%, 60%)` : `hsl(${hue}, 60%, 50%)`
  }

  const primaryColor = generateColor(slug)
  const secondaryColor = generateColor(slug.split("").reverse().join(""))

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

      {/* Dynamic elements based on project */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2
          const radius = 150 + Math.random() * 200
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={i}
              className="absolute rounded-full floating"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
                opacity: 0.6,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          )
        })}
      </div>

      {/* Central glow effect */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: primaryColor }}
      />
    </div>
  )
}

export default function ProjectDetailScene({ slug }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-slate-950">
      <ProjectDetailAnimation slug={slug} isDarkMode={isDarkMode} />
    </div>
  )
}
