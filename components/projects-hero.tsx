"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based projects hero animation
function ProjectsAnimation({ isDarkMode }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

      {/* Central "PROJECTS" text */}
      <div className="relative z-10">
        <h1
          className={`text-6xl md:text-8xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          } animate-pulse text-center`}
        >
          PROJECTS
        </h1>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 200 + Math.random() * 100
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={i}
              className={`absolute w-2 h-2 ${
                i % 2 === 0
                  ? isDarkMode
                    ? "bg-purple-500/40"
                    : "bg-blue-500/40"
                  : isDarkMode
                    ? "bg-pink-500/40"
                    : "bg-indigo-500/40"
              } rounded-sm floating`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          )
        })}
      </div>

      {/* Rotating border effect */}
      <div
        className={`absolute inset-0 border-2 ${
          isDarkMode ? "border-purple-500/20" : "border-blue-500/20"
        } rounded-full`}
        style={{
          width: "400px",
          height: "400px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "spin 20s linear infinite",
        }}
      />
    </div>
  )
}

export default function ProjectsHero() {
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
    <div className="w-full h-[40vh] bg-gradient-to-b from-black to-slate-950">
      <ProjectsAnimation isDarkMode={isDarkMode} />
    </div>
  )
}
