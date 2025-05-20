"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import CertificateCard from "@/components/certificate-card"

export default function CertificatesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const certificates = [
    {
      id: 1,
      title: "Web and Mobile App Development (Batch-11)",
      issuer: "Saylani Mass Training Programme",
      date: "Jan 2024 - Oct 2024",
      duration: "10 Months",
      certNumber: "SMIT/2024/WMA/B11/243561",
      description:
        "Successfully completed Web and Mobile App Development training under the Education Department of Saylani Welfare International Trust.",
      image: "/certificates/saylani.png",
      url: "#",
    },
    {
      id: 2,
      title: "Mobile App Development Internship",
      issuer: "DevelopersHub Corporation",
      date: "Dec 24, 2024 - Feb 20, 2025",
      duration: "6 Weeks",
      certNumber: "DHC-155",
      description:
        "Successfully completed a six-week Virtual Internship Program in Mobile App Development with exceptional performance.",
      image: "/certificates/mobile-dev.png",
      url: "#",
    },
  ]

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificates</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm committed to continuous learning and professional development. Here are some of the certificates I've
            earned along my journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </div>
    </div>
  )
}
