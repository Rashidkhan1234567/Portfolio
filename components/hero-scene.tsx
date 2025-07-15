"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based hero animation
function HeroAnimation({ isDarkMode }) {
  const skills = [
    { name: "React", position: { left: "15%", top: "25%" }, delay: 0 },
    { name: "Next.js", position: { left: "75%", top: "35%" }, delay: 0.5 },
    { name: "Node.js", position: { left: "25%", top: "65%" }, delay: 1 },
    { name: "MongoDB", position: { left: "70%", top: "75%" }, delay: 1.5 },
    { name: "Firebase", position: { left: "50%", top: "20%" }, delay: 2 },
    { name: "Express", position: { left: "20%", top: "45%" }, delay: 2.5 },
  ]

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background-secondary/30" />

      {/* Skill badges */}
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`absolute px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm ${
            isDarkMode
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "bg-blue-500/20 text-blue-700 border border-blue-500/30"
          } floating hover:scale-110 transition-transform duration-300 cursor-pointer`}
          style={{
            left: skill.position.left,
            top: skill.position.top,
            animationDelay: `${skill.delay}s`,
          }}
        >
          {skill.name}
        </div>
      ))}

      {/* Central glow effect */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-purple-500" : "bg-blue-500"
        } animate-pulse`}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-purple-400/30" : "bg-blue-400/30"} floating`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function HeroScene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return <HeroAnimation isDarkMode={isDarkMode} />
}
