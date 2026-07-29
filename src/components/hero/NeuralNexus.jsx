import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural Circuit Shard Shader
const CircuitShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#2D7EFF') },
    uGlowColor: { value: new THREE.Color('#9F7AFF') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec2 grid = abs(fract(vUv * 8.0 - vec2(uTime * 0.1, uTime * 0.05)) - 0.5);
      float line = smoothstep(0.45, 0.48, min(grid.x, grid.y));
      
      // Hexagon / Edge fade
      float dist = length(vUv - vec2(0.5));
      float edgeAlpha = smoothstep(0.5, 0.2, dist);

      // Energy pulse line
      float pulse = sin(vUv.x * 20.0 + uTime * 3.0) * 0.5 + 0.5;
      vec3 finalColor = mix(uColor, uGlowColor, pulse + line * 0.5);

      gl_FragColor = vec4(finalColor, (line * 0.7 + 0.15) * edgeAlpha);
    }
  `,
}

export default function NeuralNexus() {
  const sphereRef = useRef()
  const sphereInnerRef = useRef()
  const ringRef = useRef()
  const particlesGroupRef = useRef()
  const shardsGroupRef = useRef()
  const beamsRef = useRef()

  // 1. Central Holographic Sphere
  const sphereMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2D7EFF',
      emissive: '#2D7EFF',
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
      metalness: 0.8,
    })
  }, [])

  const sphereInnerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#7C3AED',
      emissive: '#9F7AFF',
      emissiveIntensity: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.25,
    })
  }, [])

  // 2. Orbiting Neural Ring Particles
  const PARTICLE_COUNT = 48
  const particlePositions = useMemo(() => {
    const positions = []
    const angles = []
    const radius = 3.2
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2
      angles.push(angle)
      positions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.4,
        Math.sin(angle) * radius
      )
    }
    return { positions, angles, radius }
  }, [])

  const neuralParticlesRef = useRef([])

  // 3. Floating Circuit Shards (6 geometric planes)
  const shardShaderMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(CircuitShaderMaterial.uniforms),
      vertexShader: CircuitShaderMaterial.vertexShader,
      fragmentShader: CircuitShaderMaterial.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  const shardsData = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      radius: 2.5 + (i % 3) * 0.6,
      speed: (i % 2 === 0 ? 1 : -1) * (0.3 + i * 0.08),
      tiltX: (i * 40 * Math.PI) / 180,
      tiltZ: (i * 25 * Math.PI) / 180,
      scale: 0.5 + (i % 3) * 0.2,
      angleOffset: (i * Math.PI) / 3,
    }))
  }, [])

  // 4. Energy Beams geometry
  const beamGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const pos = new Float32Array(PARTICLE_COUNT * 6) // line segments
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geom
  }, [PARTICLE_COUNT])

  const beamMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#5B9AFF',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  // Animation Loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // 1. Holographic Sphere Pulse & Breathing
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.25
      sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
      const scale = 1.6 + Math.sin(t * 1.5) * 0.06
      sphereRef.current.scale.set(scale, scale, scale)
    }

    if (sphereInnerRef.current) {
      sphereInnerRef.current.rotation.y = -t * 0.35
      sphereInnerRef.current.rotation.z = t * 0.15
      const innerScale = 1.1 + Math.cos(t * 2.0) * 0.04
      sphereInnerRef.current.scale.set(innerScale, innerScale, innerScale)
    }

    // 2. Orbiting Neural Ring & Particles
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.1
    }

    // Update particle positions along torus & update beam positions
    if (particlesGroupRef.current && beamsRef.current) {
      const positions = beamGeometry.attributes.position.array
      const particleNodes = particlesGroupRef.current.children

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = particlePositions.angles[i] + t * 0.4
        const r = particlePositions.radius + Math.sin(t * 2 + i) * 0.15
        const x = Math.cos(angle) * r
        const y = Math.sin(t * 1.5 + i) * 0.3
        const z = Math.sin(angle) * r

        if (particleNodes[i]) {
          particleNodes[i].position.set(x, y, z)
        }

        // Connect every Nth particle to form laser beams
        const nextIdx = (i + 5) % PARTICLE_COUNT
        const p1 = particleNodes[i] ? particleNodes[i].position : new THREE.Vector3(x, y, z)
        const p2 = particleNodes[nextIdx] ? particleNodes[nextIdx].position : new THREE.Vector3()

        positions[i * 6] = p1.x
        positions[i * 6 + 1] = p1.y
        positions[i * 6 + 2] = p1.z

        positions[i * 6 + 3] = p2.x
        positions[i * 6 + 4] = p2.y
        positions[i * 6 + 5] = p2.z
      }
      beamGeometry.attributes.position.needsUpdate = true
    }

    // 3. Floating Circuit Shards Animation & Shader Time
    if (shardsGroupRef.current) {
      shardShaderMat.uniforms.uTime.value = t
      shardsGroupRef.current.children.forEach((shard, idx) => {
        const data = shardsData[idx]
        const angle = t * data.speed + data.angleOffset
        shard.position.x = Math.cos(angle) * data.radius
        shard.position.z = Math.sin(angle) * data.radius
        shard.position.y = Math.sin(t * 0.8 + idx) * 0.6
        shard.rotation.x = data.tiltX + Math.sin(t * 0.5 + idx) * 0.2
        shard.rotation.y = angle + Math.PI / 2
        shard.rotation.z = data.tiltZ + Math.cos(t * 0.7 + idx) * 0.2
      })
    }
  })

  return (
    <group>
      {/* Central Holographic Sphere */}
      <mesh ref={sphereRef} material={sphereMaterial}>
        <icosahedronGeometry args={[1, 3]} />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh ref={sphereInnerRef} material={sphereInnerMaterial}>
        <icosahedronGeometry args={[0.95, 2]} />
      </mesh>

      {/* Orbiting Neural Ring Torus */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[3.2, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#5B9AFF"
            emissive="#2D7EFF"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Neural Particles riding orbit */}
      <group ref={particlesGroupRef}>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#9F7AFF' : '#5B9AFF'}
              emissive={i % 3 === 0 ? '#7C3AED' : '#2D7EFF'}
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      {/* Energy Beams Connecting Neural Particles */}
      <primitive object={new THREE.LineSegments(beamGeometry, beamMaterial)} ref={beamsRef} />

      {/* Floating Circuit Shards */}
      <group ref={shardsGroupRef}>
        {shardsData.map((data, idx) => (
          <mesh key={idx} material={shardShaderMat} scale={[data.scale, data.scale, data.scale]}>
            <circleGeometry args={[0.7, 6]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
