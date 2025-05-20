"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CertificatesPage() {
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const certificates = [
    {
      id: 1,
      title: "Web and Mobile App Development (Batch-11)",
      issuer: "Saylani Mass Training Programme",
      image: "/certificates/saylani.png",
    },
    {
      id: 2,
      title: "Mobile App Development Internship",
      issuer: "DevelopersHub Corporation",
      image: "/certificates/mobile-dev.png",
    },
  ]

  useEffect(() => {
    // If all images are loaded, set loading to false
    if (imagesLoaded === certificates.length) {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }, [imagesLoaded, certificates.length])

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Certificates</h1>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading certificates...</p>
            </div>
          )}

          <motion.div
            className="grid grid-cols-1 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-card rounded-lg overflow-hidden border">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold">{certificate.title}</h2>
                  <p className="text-muted-foreground">{certificate.issuer}</p>
                </div>
                <div className="relative aspect-[1.414/1] w-full">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    fill
                    className="object-contain p-4"
                    quality={100}
                    unoptimized
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
