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
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#d946ef" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#0ea5e9" />

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
            CONTACT
          </Text>
        </Float>

        {/* Decorative elements - connected nodes */}
        {Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 15) * Math.PI * 2
          const radius = 5
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const z = (Math.random() - 0.5) * 2

          return (
            <group key={i}>
              <mesh position={[x, y, z]} scale={0.2 + Math.random() * 0.1}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? "#d946ef" : "#0ea5e9"}
                  emissive={i % 2 === 0 ? "#d946ef" : "#0ea5e9"}
                  emissiveIntensity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>

              {/* Connect to a few nearby nodes */}
              {Array.from({ length: 2 }).map((_, j) => {
                const targetIndex = (i + j + 1) % 15
                const targetAngle = (targetIndex / 15) * Math.PI * 2
                const targetX = Math.cos(targetAngle) * radius
                const targetY = Math.sin(targetAngle) * radius
                const targetZ = (Math.random() - 0.5) * 2

                return (
                  <mesh
                    key={`${i}-${j}`}
                    position={[(x + targetX) / 2, (y + targetY) / 2, (z + targetZ) / 2]}
                    rotation={[
                      Math.atan2(Math.sqrt((targetX - x) ** 2 + (targetZ - z) ** 2), targetY - y) - Math.PI / 2,
                      0,
                      Math.atan2(targetZ - z, targetX - x),
                    ]}
                  >
                    <cylinderGeometry
                      args={[0.02, 0.02, Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2 + (targetZ - z) ** 2), 8]}
                    />
                    <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
                  </mesh>
                )
              })}
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

export default function ContactScene() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-slate-950">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
