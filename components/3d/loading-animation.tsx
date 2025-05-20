"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

// Animated cube for loading indicator - theme aware with improved light theme colors
function LoadingCube({ progress }) {
  const meshRef = useRef()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.5
    meshRef.current.rotation.y = t * 0.7
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={isDarkMode ? "#8b5cf6" : "#3b82f6"}
          wireframe={true}
          emissive={isDarkMode ? "#8b5cf6" : "#3b82f6"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Progress text */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.5}
        color={isDarkMode ? "white" : "#1e293b"}
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.round(progress)}%`}
      </Text>

      <Text
        position={[0, -4, 0]}
        fontSize={0.3}
        color={isDarkMode ? "#ec4899" : "#6366f1"}
        anchorX="center"
        anchorY="middle"
      >
        Loading...
      </Text>
    </group>
  )
}

// Loading scene
function LoadingScene({ progress }) {
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
      <directionalLight position={[5, 5, 5]} intensity={0.5} color={isDarkMode ? "#8b5cf6" : "#3b82f6"} />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color={isDarkMode ? "#ec4899" : "#6366f1"} />

      <LoadingCube progress={progress} />
    </>
  )
}

export default function LoadingAnimation({ isLoading, setIsLoading }) {
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return

    let interval

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          if (newProgress >= 100) {
            clearInterval(interval)
            // Add a small delay before hiding the loader
            setTimeout(() => setIsLoading(false), 500)
            return 100
          }
          return newProgress
        })
      }, 200)
    }

    return () => clearInterval(interval)
  }, [isLoading, progress, setIsLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-50 ${
            isDarkMode ? "bg-background" : "bg-slate-50"
          } flex items-center justify-center`}
        >
          <div className="w-64 h-64">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <LoadingScene progress={progress} />
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
