"use client"

import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import CertificatesSection from "@/components/sections/certificates-section"
import ContactSection from "@/components/sections/contact-section"
import FloatingNav from "@/components/floating-nav"
import ErrorBoundary from "@/components/error-boundary"
import LoadingAnimation from "@/components/3d/loading-animation"

// Dynamically import the 3D components with no SSR
const HeroSection = dynamic(() => import("@/components/sections/hero-section-with-fallback"), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate page loading
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Start loading animation
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000) // Show loading for at least 3 seconds

      // Listen for window load event
      const handleLoad = () => {
        clearTimeout(timer)
        setIsLoading(false)
      }

      window.addEventListener("load", handleLoad)

      // Cleanup
      return () => {
        clearTimeout(timer)
        window.removeEventListener("load", handleLoad)
      }
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Loading Animation */}
      <LoadingAnimation isLoading={isLoading} setIsLoading={setIsLoading} />

      {/* Only show content when loading is complete */}
      {!isLoading && (
        <>
          <FloatingNav />

          <section id="hero" className="w-full">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <ErrorBoundary sectionName="Hero Section">
                <HeroSection />
              </ErrorBoundary>
            </Suspense>
          </section>

          <section id="about" className="w-full py-20">
            <ErrorBoundary sectionName="About Section">
              <AboutSection />
            </ErrorBoundary>
          </section>

          <section id="skills" className="w-full py-20">
            <ErrorBoundary sectionName="Skills Section">
              <SkillsSection />
            </ErrorBoundary>
          </section>

          <section id="projects" className="w-full py-20">
            <ErrorBoundary sectionName="Projects Section">
              <ProjectsSection />
            </ErrorBoundary>
          </section>

          <section id="certificates" className="w-full py-20">
            <ErrorBoundary sectionName="Certificates Section">
              <CertificatesSection />
            </ErrorBoundary>
          </section>

          <section id="contact" className="w-full py-20">
            <ErrorBoundary sectionName="Contact Section">
              <ContactSection />
            </ErrorBoundary>
          </section>
        </>
      )}
    </main>
  )
}
