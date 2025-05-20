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
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ff00ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#00ffff" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            font="/fonts/Inter_Bold.json"
            fontSize={2}
            color="#ffffff"
            position={[0, 0, 0]}
            anchorX="center"
            anchorY="middle"
          >
            PROJECTS
          </Text>
        </Float>

        {/* Decorative elements */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 5
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const z = (Math.random() - 0.5) * 2

          return (
            <mesh key={i} position={[x, y, z]} scale={0.1 + Math.random() * 0.2}>
              <boxGeometry />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#ff00ff" : "#00ffff"}
                emissive={i % 2 === 0 ? "#ff00ff" : "#00ffff"}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
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

export default function ProjectsHero() {
  return (
    <div className="w-full h-[40vh] bg-gradient-to-b from-black to-slate-950">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
