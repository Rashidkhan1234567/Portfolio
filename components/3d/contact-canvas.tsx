"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function Scene() {
  const sphereRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    sphereRef.current.rotation.x = Math.sin(t / 4) * 0.3
    sphereRef.current.rotation.y = Math.sin(t / 2) * 0.2
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ec4899" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Environment preset="night" />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export default function ContactCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Scene />
    </Canvas>
  )
}
