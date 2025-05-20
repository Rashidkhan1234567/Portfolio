"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "@/components/theme-provider"

// Simplified particles for better performance and fewer fetch requests
function Particles({ count = 100, isDarkMode }) {
  const points = useRef()

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.01
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  // Generate random positions for particles
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 30
    positions[i3 + 1] = (Math.random() - 0.5) * 30
    positions[i3 + 2] = (Math.random() - 0.5) * 30

    // Set colors based on theme
    if (isDarkMode) {
      colors[i3] = Math.random() * 0.5 + 0.5 // R: 0.5-1.0
      colors[i3 + 1] = Math.random() * 0.2 // G: 0-0.2
      colors[i3 + 2] = Math.random() * 0.5 + 0.5 // B: 0.5-1.0
    } else {
      colors[i3] = Math.random() * 0.3 // R: 0-0.3
      colors[i3 + 1] = Math.random() * 0.3 // G: 0-0.3
      colors[i3 + 2] = Math.random() * 0.5 + 0.5 // B: 0.5-1.0
    }
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Main scene component
function Scene() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <>
      <ambientLight intensity={0.2} />
      <Particles count={200} isDarkMode={isDarkMode} />
    </>
  )
}

export default function BackgroundCanvas() {
  const [hasError, setHasError] = useState(false)

  // Error handler
  const handleError = (error) => {
    console.error("Background canvas error:", error)
    setHasError(true)
  }

  if (hasError) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background-secondary" />
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 -z-10 opacity-60 transition-opacity duration-500">
      <Canvas dpr={[0.5, 1]} camera={{ position: [0, 0, 15], fov: 50 }} onError={handleError}>
        <Scene />
      </Canvas>
    </div>
  )
}
