"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, User, Code, Briefcase, Award, Mail } from "lucide-react"
// Import the utility functions at the top of the file
import { isClient, safeScrollToElement } from "@/lib/client-utils"

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true)

    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined") return

    const handleScroll = () => {
      try {
        // Show floating nav after scrolling down a bit
        if (window.scrollY > 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }

        // Determine active section
        const sections = ["hero", "about", "skills", "projects", "certificates", "contact"]

        for (const section of [...sections].reverse()) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 200) {
              setActiveSection(section)
              break
            }
          }
        }
      } catch (error) {
        console.error("Error in floating nav scroll handler:", error)
      }
    }

    // Initial check - wrapped in try/catch
    try {
      handleScroll()
    } catch (error) {
      console.error("Error in initial scroll check:", error)
    }

    // Add event listener - wrapped in try/catch
    try {
      if (isMounted && typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll)
      }
    } catch (error) {
      console.error("Error adding scroll listener:", error)
    }

    // Cleanup function
    return () => {
      try {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", handleScroll)
        }
      } catch (error) {
        console.error("Error removing scroll listener:", error)
      }
    }
  }, [isMounted]) // Add isMounted to dependency array

  // Replace the handleNavClick function with this safer version
  const handleNavClick = (e, sectionId) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    // Use the safe utility function
    safeScrollToElement(sectionId, 80)

    // Update URL hash without scrolling (which would cause a jump)
    if (isClient()) {
      try {
        window.history.pushState(null, null, `#${sectionId}`)
      } catch (error) {
        console.error("Error updating URL hash:", error)
      }
    }
  }

  const navItems = [
    { id: "hero", icon: <Home className="h-4 w-4" />, label: "Home" },
    { id: "about", icon: <User className="h-4 w-4" />, label: "About" },
    { id: "skills", icon: <Code className="h-4 w-4" />, label: "Skills" },
    { id: "projects", icon: <Briefcase className="h-4 w-4" />, label: "Projects" },
    { id: "certificates", icon: <Award className="h-4 w-4" />, label: "Certificates" },
    { id: "contact", icon: <Mail className="h-4 w-4" />, label: "Contact" },
  ]

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-background/80 backdrop-blur-md border rounded-full px-4 py-2 shadow-lg">
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative flex items-center justify-center p-2 rounded-full transition-colors ${
                activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 bg-secondary rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
            </a>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
