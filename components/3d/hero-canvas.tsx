"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

// Simple CSS-based floating elements
function FloatingElements({ isDarkMode }) {
  const skills = [
    { name: "React", position: { left: "10%", top: "20%" } },
    { name: "Next.js", position: { left: "80%", top: "30%" } },
    { name: "Node.js", position: { left: "20%", top: "70%" } },
    { name: "MongoDB", position: { left: "70%", top: "80%" } },
    { name: "Firebase", position: { left: "50%", top: "15%" } },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`absolute w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium ${
            isDarkMode
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "bg-blue-500/20 text-blue-700 border border-blue-500/30"
          } backdrop-blur-sm floating`}
          style={{
            left: skill.position.left,
            top: skill.position.top,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {skill.name.slice(0, 2)}
        </div>
      ))}
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

  return (
    <div className="w-full h-full absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background-secondary/50" />
      <FloatingElements isDarkMode={isDarkMode} />
    </div>
  )
}
