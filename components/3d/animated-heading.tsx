"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function AnimatedHeading() {
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
    <motion.div
      className="w-full h-[300px] md:h-[400px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center relative">
        {/* Animated background glow */}
        <div
          className={`absolute inset-0 blur-3xl opacity-30 ${
            isDarkMode ? "bg-purple-500" : "bg-blue-500"
          } rounded-full animate-pulse`}
        />

        {/* Main heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="block mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hi, I'm
          </motion.span>
          <motion.span
            className="gradient-text block perspective-text"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Rashid Khan
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Full-Stack Developer
        </motion.h2>

        {/* Floating particles around text */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400/40" : "bg-blue-400/40"} floating`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
