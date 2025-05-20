"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

// This component safely uses useSearchParams inside a Suspense boundary
function AnalyticsContent() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Skip if not mounted or not on client
    if (typeof window === "undefined" || typeof document === "undefined" || !mounted) return

    try {
      // This is where you would typically add your analytics tracking code
      // Example for Google Analytics:
      // if (window.gtag) {
      //   window.gtag("config", "YOUR-GA-ID", {
      //     page_path: pathname,
      //   })
      // }

      console.log(`Page view: ${pathname}`)
    } catch (error) {
      console.error("Analytics error:", error)
    }
  }, [pathname, mounted])

  return null
}

// Wrapper component that provides the Suspense boundary
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  )
}
