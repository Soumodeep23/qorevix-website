import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 2000 }) {
  const pointsRef = useRef()

  // Adjust particle count for mobile screens to ensure 60fps
  const effectiveCount = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.min(800, count)
    }
    return count
  }, [count])

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(effectiveCount * 3)
    const col = new Float32Array(effectiveCount * 3)

    const color1 = new THREE.Color('#2D7EFF')
    const color2 = new THREE.Color('#9F7AFF')
    const color3 = new THREE.Color('#5B9AFF')

    for (let i = 0; i < effectiveCount; i++) {
      const r = 4.5 + Math.random() * 8.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const randColor = Math.random()
      const c = randColor < 0.5 ? color1 : randColor < 0.8 ? color2 : color3
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [effectiveCount])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={effectiveCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={effectiveCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
