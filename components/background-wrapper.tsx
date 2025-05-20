"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the background canvas with no SSR
const BackgroundCanvas = dynamic(() => import("@/components/3d/background-canvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background-secondary" />,
})

export default function BackgroundWrapper() {
  return (
    <Suspense
      fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background-secondary" />}
    >
      <BackgroundCanvas />
    </Suspense>
  )
}
