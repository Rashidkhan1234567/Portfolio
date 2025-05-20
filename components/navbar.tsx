"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Menu, X, Github, Linkedin, FileText, Instagram } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

// Import the utility functions at the top of the file
import { isClient, safeScrollToElement } from "@/lib/client-utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  const toggleMenu = () => setIsOpen(!isOpen)

  // Mark component as mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll events
  useEffect(() => {
    // Skip on server or if not mounted
    if (typeof window === "undefined" || typeof document === "undefined" || !mounted) return

    const handleScroll = () => {
      try {
        if (window.scrollY > 10) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }
      } catch (error) {
        console.error("Error in navbar scroll handler:", error)
      }
    }

    // Initial check - wrapped in try/catch
    try {
      handleScroll()
    } catch (error) {
      console.error("Error in initial navbar scroll check:", error)
    }

    // Add event listener - wrapped in try/catch
    try {
      window.addEventListener("scroll", handleScroll)
    } catch (error) {
      console.error("Error adding navbar scroll listener:", error)
    }

    // Cleanup function
    return () => {
      try {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", handleScroll)
        }
      } catch (error) {
        console.error("Error removing navbar scroll listener:", error)
      }
    }
  }, [mounted])

  // Replace the handleNavClick function with this safer version
  const handleNavClick = (e, sectionId) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false)
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

  const socialLinks = [
    {
      name: "GitHub",
      path: "https://github.com/Rashidkhan1234567",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/rashid-khan-4213ab299/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/leovibesx/",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "CV",
      path: "/resume",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  const navLinks = [
    { name: "Home", path: "#hero", sectionId: "hero" },
    { name: "About", path: "#about", sectionId: "about" },
    { name: "Skills", path: "#skills", sectionId: "skills" },
    { name: "Projects", path: "#projects", sectionId: "projects" },
    { name: "Certificates", path: "#certificates", sectionId: "certificates" },
    { name: "Contact", path: "#contact", sectionId: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="text-xl md:text-2xl font-bold" onClick={(e) => handleNavClick(e, "hero")}>
            <span className="gradient-text">Rashid</span>
            <span>.dev</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={(e) => handleNavClick(e, link.sectionId)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links & Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                target={link.name !== "CV" ? "_blank" : undefined}
                rel={link.name !== "CV" ? "noopener noreferrer" : undefined}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ModeToggle />
            <button
              className="text-foreground focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={link.path}
                  className="block py-2 text-lg font-medium"
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  target={link.name !== "CV" ? "_blank" : undefined}
                  rel={link.name !== "CV" ? "noopener noreferrer" : undefined}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + index) * 0.05 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
