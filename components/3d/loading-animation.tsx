"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

// CSS-based loading cube
function LoadingCube({ progress, isDarkMode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Animated cube */}
      <div
        className={`w-16 h-16 border-4 ${
          isDarkMode ? "border-purple-500" : "border-blue-500"
        } border-t-transparent rounded-lg animate-spin mb-6`}
        style={{
          animation: "spin 2s linear infinite, pulse 2s ease-in-out infinite alternate",
        }}
      />

      {/* Progress text */}
      <div className="text-center">
        <div className={`text-4xl font-bold mb-2 ${isDarkMode ? "text-purple-300" : "text-blue-600"}`}>
          {Math.round(progress)}%
        </div>
        <div className={`text-lg ${isDarkMode ? "text-pink-400" : "text-indigo-600"}`}>Loading...</div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-secondary rounded-full mt-4 overflow-hidden">
        <motion.div
          className={`h-full ${isDarkMode ? "bg-purple-500" : "bg-blue-500"} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

export default function LoadingAnimation({ isLoading, setIsLoading }) {
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return

    let interval

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          if (newProgress >= 100) {
            clearInterval(interval)
            // Add a small delay before hiding the loader
            setTimeout(() => setIsLoading(false), 500)
            return 100
          }
          return newProgress
        })
      }, 200)
    }

    return () => clearInterval(interval)
  }, [isLoading, progress, setIsLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-50 ${
            isDarkMode ? "bg-background" : "bg-slate-50"
          } flex items-center justify-center`}
        >
          <LoadingCube progress={progress} isDarkMode={isDarkMode} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
