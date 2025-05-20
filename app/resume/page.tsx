"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import { jsPDF } from "jspdf"
import { motion } from "framer-motion"

export default function ResumePage() {
  const imageRef = useRef<HTMLImageElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Set a timeout to ensure we show loading state for at least 1 second
    // This prevents flickering if the image loads very quickly
    const minLoadingTimer = setTimeout(() => {
      if (imageRef.current && imageRef.current.complete) {
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(minLoadingTimer)
  }, [])

  const handleImageLoad = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  const handleDownloadPDF = () => {
    if (!imageRef.current) return

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [imageRef.current.naturalWidth, imageRef.current.naturalHeight],
    })

    // Add the image to the PDF
    doc.addImage(imageRef.current.src, "PNG", 0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight)

    // Save the PDF
    doc.save("Rashid-Khan-CV.pdf")
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <Button asChild variant="ghost" className="mb-0">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border relative">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted-foreground">Loading resume...</p>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">!</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Failed to load resume</h3>
                <p className="text-muted-foreground mb-6">
                  There was an issue loading the resume image. Please try downloading the PDF directly.
                </p>
                <Button onClick={handleDownloadPDF} className="rounded-full px-6 flex items-center gap-2">
                  <Download size={16} />
                  Download as PDF
                </Button>
              </div>
            )}

            {/* Resume Image */}
            <motion.div
              className="relative w-full"
              style={{ maxHeight: "800px", overflow: "auto" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                ref={imageRef}
                src="/Rashid-Khan-CV.png"
                alt="Rashid Khan CV"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "800px" }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={handleDownloadPDF} className="rounded-full px-6 flex items-center gap-2">
              <Download size={16} />
              Download as PDF
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
