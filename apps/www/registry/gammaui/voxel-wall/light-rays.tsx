"use client"

import { forwardRef, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import {
  Bloom,
  EffectComposer,
  GodRays,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"

import { HOLE_CENTER, HOLE_SIZE, LIGHT_ORIGIN, ROOM_DEPTH } from "./wall"

interface LightSourceProps {
  position?: [number, number, number]
}

export const LightSource = forwardRef<THREE.Mesh, LightSourceProps>(
  function LightSource({ position }, ref) {
    useFrame(({ clock }) => {
      if (!ref || typeof ref === "function" || !ref.current) return

      const pulse = 0.96 + Math.sin(clock.elapsedTime * 1.2) * 0.04
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulse
    })

    return (
      <mesh
        ref={ref}
        position={position ?? [HOLE_CENTER.x, HOLE_CENTER.y, HOLE_CENTER.z]}
        rotation={[0, 0, -0.08]}
      >
        <planeGeometry
          args={[HOLE_SIZE.width * 1.15, HOLE_SIZE.height * 1.2]}
        />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    )
  }
)

export function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 220
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = HOLE_CENTER.x + (Math.random() - 0.5) * HOLE_SIZE.width * 1.6
      arr[i * 3 + 1] =
        HOLE_CENTER.y + (Math.random() - 0.5) * HOLE_SIZE.height * 1.5
      arr[i * 3 + 2] = -ROOM_DEPTH + Math.random() * (ROOM_DEPTH + 2)
    }
    return arr
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame(({ clock }) => {
    const points = pointsRef.current
    if (!points) return
    points.rotation.z = Math.sin(clock.elapsedTime * 0.06) * 0.015
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.022}
        color="#ffffff"
        transparent
        opacity={0.14}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

interface LightEffectsProps {
  sun: THREE.Mesh
}

export function LightEffects({ sun }: LightEffectsProps) {
  return (
    <EffectComposer multisampling={0}>
      <GodRays
        sun={sun}
        blendFunction={BlendFunction.SCREEN}
        samples={80}
        density={0.96}
        decay={0.92}
        weight={0.5}
        exposure={0.42}
        clampMax={1}
        blur
      />
      <Bloom
        luminanceThreshold={0.55}
        luminanceSmoothing={0.35}
        intensity={1.15}
        mipmapBlur
      />
      <Noise opacity={0.07} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.18} darkness={1.15} />
    </EffectComposer>
  )
}

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.008} color="#0a0a0a" />
      <pointLight
        position={[LIGHT_ORIGIN.x, LIGHT_ORIGIN.y, LIGHT_ORIGIN.z]}
        intensity={340}
        color="#ffffff"
        distance={26}
        decay={2}
      />
    </>
  )
}
