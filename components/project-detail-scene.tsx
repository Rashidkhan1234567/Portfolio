"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function Scene({ slug }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2
  })

  // Generate a unique scene based on the project slug
  const generateColor = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase()
    return "#" + "00000".substring(0, 6 - c.length) + c
  }

  const primaryColor = generateColor(slug)
  const secondaryColor = generateColor(slug.split("").reverse().join(""))

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color={primaryColor} />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color={secondaryColor} />

      <group ref={groupRef}>
        {/* Decorative elements */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2
          const radius = 8
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const z = (Math.random() - 0.5) * 4

          return (
            <mesh key={i} position={[x, y, z]} scale={0.2 + Math.random() * 0.3}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? primaryColor : secondaryColor}
                emissive={i % 2 === 0 ? primaryColor : secondaryColor}
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

export default function ProjectDetailScene({ slug }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-slate-950">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Scene slug={slug} />
      </Canvas>
    </div>
  )
}
