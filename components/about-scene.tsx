"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#9333ea" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />

      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            font="/fonts/Inter_Bold.json"
            fontSize={2}
            color="#ffffff"
            position={[0, 0, 0]}
            anchorX="center"
            anchorY="middle"
          >
            ABOUT
          </Text>
        </Float>

        {/* Decorative elements - DNA-like double helix */}
        {Array.from({ length: 40 }).map((_, i) => {
          const t = (i / 40) * Math.PI * 4
          const radius = 4
          const x1 = Math.cos(t) * radius
          const y1 = (i / 40) * 10 - 5
          const z1 = Math.sin(t) * radius

          const x2 = Math.cos(t + Math.PI) * radius
          const y2 = y1
          const z2 = Math.sin(t + Math.PI) * radius

          return (
            <group key={i}>
              <mesh position={[x1, y1, z1]} scale={0.15}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color="#9333ea"
                  emissive="#9333ea"
                  emissiveIntensity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
              <mesh position={[x2, y2, z2]} scale={0.15}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color="#06b6d4"
                  emissive="#06b6d4"
                  emissiveIntensity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
              {i % 4 === 0 && (
                <mesh
                  position={[(x1 + x2) / 2, y1, (z1 + z2) / 2]}
                  rotation={[Math.PI / 2, Math.atan2(z2 - z1, x2 - x1), 0]}
                >
                  <cylinderGeometry args={[0.03, 0.03, Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2), 8]} />
                  <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
                </mesh>
              )}
            </group>
          )
        })}
      </group>

      <Environment preset="night" />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export default function AboutScene() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-slate-950">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
