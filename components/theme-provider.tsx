"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage only on client side
  useEffect(() => {
    // Mark as mounted
    setMounted(true)

    // Skip on server
    if (typeof window === "undefined") return

    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme) {
        setTheme(savedTheme)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [storageKey])

  // Apply theme class to document
  useEffect(() => {
    // Skip on server or if not mounted
    if (typeof window === "undefined" || typeof document === "undefined" || !mounted) return

    try {
      const root = document.documentElement
      if (!root) return

      root.classList.remove("light", "dark")

      if (theme === "system") {
        try {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          root.classList.add(systemTheme)
        } catch (error) {
          console.error("Error detecting system theme:", error)
          // Fallback to dark theme
          root.classList.add("dark")
        }
      } else {
        root.classList.add(theme)
      }
    } catch (error) {
      console.error("Error applying theme:", error)
    }
  }, [theme, mounted])

  // Only update localStorage on client side
  const setThemeWithStorage = (newTheme: Theme) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    } catch (error) {
      console.error("Error setting theme:", error)
      setTheme(newTheme) // Still update the theme even if localStorage fails
    }
  }

  const value = {
    theme,
    setTheme: setThemeWithStorage,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
