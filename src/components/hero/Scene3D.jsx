import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'
import NeuralNexus from './NeuralNexus'
import Particles from './Particles'
import { useMouse } from '../../hooks/useMouse'
import { useLenis } from '../../hooks/useLenis'

function SceneContent() {
  const mouse = useMouse()
  const lightRef = useRef()
  const mainGroupRef = useRef()
  const { viewport } = useThree()

  // Track scroll position for scroll-linked 3D transformation
  useLenis((e) => {
    if (mainGroupRef.current) {
      const scrollY = e.scroll
      mainGroupRef.current.rotation.y = scrollY * 0.0012
      mainGroupRef.current.rotation.x = scrollY * 0.0006
      const scale = Math.max(0.7, 1 - scrollY * 0.0004)
      mainGroupRef.current.scale.set(scale, scale, scale)
    }
  })

  // Mouse reactive light tracking
  useFrame(() => {
    if (lightRef.current) {
      const targetX = (mouse.x * viewport.width) / 2
      const targetY = (mouse.y * viewport.height) / 2
      lightRef.current.position.x += (targetX - lightRef.current.position.x) * 0.1
      lightRef.current.position.y += (targetY - lightRef.current.position.y) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#2D7EFF" />
      <pointLight
        ref={lightRef}
        position={[0, 0, 4]}
        intensity={3.5}
        distance={12}
        color="#5B9AFF"
      />
      <pointLight position={[-6, -4, -4]} intensity={1.5} color="#9F7AFF" />

      <group ref={mainGroupRef}>
        <NeuralNexus />
        <Particles count={2000} />
      </group>

      {/* Hologram Post-Processing */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1.2}
        />
        <ChromaticAberration
          offset={new Vector2(0.002, 0.002)}
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="hero-3d">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
