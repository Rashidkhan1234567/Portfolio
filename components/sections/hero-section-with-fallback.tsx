"use client"

import { useRef, Suspense, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { safeScrollToElement } from "@/lib/client-utils"

// Fallback component for when 3D fails
const FallbackHeading = () => (
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
      <span className="block mb-2">Hi, I'm</span>
      <span className="gradient-text block">Rashid Khan</span>
    </h1>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">Full-Stack Developer</h2>
  </div>
)

// Fallback background
const FallbackBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-background to-background-secondary" />
)

// Dynamically import the 3D components with no SSR and error handling
const HeroCanvas = dynamic(() => import("@/components/3d/hero-canvas"), {
  ssr: false,
  loading: () => <FallbackBackground />,
})

const AnimatedHeading = dynamic(() => import("@/components/3d/animated-heading"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
      <FallbackHeading />
    </div>
  ),
})

export default function HeroSection() {
  const containerRef = useRef(null)
  const [has3DError, setHas3DError] = useState(false)
  const [hasHeadingError, setHasHeadingError] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mark component as mounted
  useEffect(() => {
    setMounted(true)

    // Global error handler for 3D components
    const handleError = (event) => {
      if (
        event.message &&
        (event.message.includes("three") ||
          event.message.includes("Failed to fetch") ||
          event.message.includes("WebGL"))
      ) {
        setHas3DError(true)
        setHasHeadingError(true)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("error", handleError)
      window.addEventListener("unhandledrejection", () => {
        setHas3DError(true)
        setHasHeadingError(true)
      })

      return () => {
        window.removeEventListener("error", handleError)
        window.removeEventListener("unhandledrejection", handleError)
      }
    }
  }, [])

  // Scroll animations - only run on client side
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleScrollDown = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    safeScrollToElement("about", 80)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Canvas with Error Handling */}
      <div className="absolute inset-0 z-0">
        {has3DError ? (
          <FallbackBackground />
        ) : (
          <Suspense fallback={<FallbackBackground />}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      {/* Content with scroll animation */}
      <motion.div className="container mx-auto px-4 z-10 pt-16 md:pt-20" style={mounted ? { y, opacity } : {}}>
        <div className="max-w-4xl mx-auto text-center">
          {/* 3D Animated Heading with Error Handling */}
          {hasHeadingError ? (
            <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
              <FallbackHeading />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
                  <FallbackHeading />
                </div>
              }
            >
              <AnimatedHeading />
            </Suspense>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              I build modern, responsive web applications with React, Next.js, Node.js, and more. Let's create something
              amazing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300 bg-primary hover:bg-primary/90"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  safeScrollToElement("projects", 80)
                }}
              >
                View My Work
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300 border-primary text-primary hover:bg-primary/10"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  safeScrollToElement("contact", 80)
                }}
              >
                Contact Me
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 2.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform duration-300"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  )
}
