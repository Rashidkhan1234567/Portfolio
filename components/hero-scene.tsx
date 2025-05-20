"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function FloatingObject({ position, rotation, scale, color, speed = 1 }) {
  const mesh = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    mesh.current.position.y = position[1] + Math.sin(t) * 0.5
    mesh.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.2
    mesh.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.2
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function Scene() {
  const cameraRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(t * 0.1) * 2
      cameraRef.current.position.y = Math.cos(t * 0.1) * 1
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 15]} fov={50} />

      {/* Background gradient sphere */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial color="#000000" side={1} />
      </mesh>

      {/* Floating objects */}
      <FloatingObject position={[-4, 2, 0]} rotation={[0.5, 0.5, 0]} scale={1.5} color="#ff00ff" speed={0.8} />
      <FloatingObject position={[5, -2, 2]} rotation={[0.2, 0.3, 0.1]} scale={1.2} color="#00ffff" speed={1.2} />
      <FloatingObject position={[0, 3, -2]} rotation={[0.1, 0.5, 0.3]} scale={0.8} color="#ff00aa" speed={1} />
      <FloatingObject position={[-3, -3, 1]} rotation={[0.3, 0.2, 0.1]} scale={1} color="#aa00ff" speed={0.9} />
      <FloatingObject position={[4, 0, -1]} rotation={[0.5, 0.1, 0.2]} scale={0.7} color="#00aaff" speed={1.1} />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional lights for dramatic effect */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ff00ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#00ffff" />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
