"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

// Simple 3D text component with minimal dependencies
function SimpleText({ text, position, isDarkMode, scale = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    // Simple floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.05

    // Hover effect
    if (hovered) {
      meshRef.current.scale.x = Math.min(meshRef.current.scale.x + 0.01, scale * 1.2)
      meshRef.current.scale.y = Math.min(meshRef.current.scale.y + 0.01, scale * 1.2)
      meshRef.current.scale.z = Math.min(meshRef.current.scale.z + 0.01, scale * 1.2)
    } else {
      meshRef.current.scale.x = Math.max(meshRef.current.scale.x - 0.01, scale)
      meshRef.current.scale.y = Math.max(meshRef.current.scale.y - 0.01, scale)
      meshRef.current.scale.z = Math.max(meshRef.current.scale.z - 0.01, scale)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text
        color={isDarkMode ? (hovered ? "#a855f7" : "#e9d5ff") : hovered ? "#3b82f6" : "#93c5fd"}
        fontSize={1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Inter-Bold.ttf" // Use .ttf instead of .json
      >
        {text}
      </Text>
    </mesh>
  )
}

// Main scene component
function HeadingScene() {
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
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional lights */}
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isDarkMode ? "#a855f7" : "#3b82f6"} />

      {/* Simple text components */}
      <SimpleText text="Hi, I'm Rashid Khan" position={[0, 0.5, 0]} isDarkMode={isDarkMode} scale={1.2} />
      <SimpleText text="Full-Stack Developer" position={[0, -0.5, 0]} isDarkMode={isDarkMode} scale={0.8} />
    </>
  )
}

// Main component with error handling
export default function AnimatedHeading() {
  const [hasError, setHasError] = useState(false)

  // Fallback UI
  const FallbackUI = () => (
    <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          <span className="block mb-2">Hi, I'm</span>
          <span className="gradient-text block">Rashid Khan</span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">Full-Stack Developer</h2>
      </div>
    </div>
  )

  // Error handler
  const handleError = (error) => {
    console.error("3D heading error:", error)
    setHasError(true)
  }

  if (hasError) {
    return <FallbackUI />
  }

  return (
    <motion.div
      className="w-full h-[300px] md:h-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0) // Transparent background
        }}
        onError={handleError}
        dpr={[0.5, 1]} // Lower resolution for better performance
      >
        <HeadingScene />
      </Canvas>
    </motion.div>
  )
}
