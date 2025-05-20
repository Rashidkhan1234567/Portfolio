"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "@/components/theme-provider"

// Simple floating icon
function FloatingIcon({ position, color, size = 0.5 }) {
  const mesh = useRef()
  const time = useRef(Math.random() * 100)

  useFrame((state) => {
    time.current += state.clock.getDelta() * 0.5

    // Simple floating motion
    mesh.current.position.y = position[1] + Math.sin(time.current) * 0.2
    mesh.current.rotation.x = Math.sin(time.current * 0.2) * 0.1
    mesh.current.rotation.z = Math.sin(time.current * 0.15) * 0.1
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
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

  // Simplified skill icons with theme-specific colors
  const skills = [
    { position: [-4, 2, 0], color: isDarkMode ? "#a855f7" : "#3b82f6" },
    { position: [5, -2, 2], color: isDarkMode ? "#ec4899" : "#6366f1" },
    { position: [0, 3, -2], color: isDarkMode ? "#8b5cf6" : "#2563eb" },
    { position: [-3, -3, 1], color: isDarkMode ? "#d946ef" : "#4f46e5" },
    { position: [4, 0, -1], color: isDarkMode ? "#c026d3" : "#0ea5e9" },
  ]

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional lights */}
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isDarkMode ? "#a855f7" : "#3b82f6"} />

      {/* Skill icons */}
      {skills.map((skill, index) => (
        <FloatingIcon key={index} position={skill.position} color={skill.color} />
      ))}
    </>
  )
}

// Main component with error handling
export default function HeroCanvas() {
  const [hasError, setHasError] = useState(false)

  // Error handler
  const handleError = (error) => {
    console.error("Hero canvas error:", error)
    setHasError(true)
  }

  if (hasError) {
    return <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-background to-background-secondary" />
  }

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas dpr={[0.5, 1]} camera={{ position: [0, 0, 15], fov: 50 }} onError={handleError}>
        <Scene />
      </Canvas>
    </div>
  )
}
