"use client"

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"

import CameraRig from "./camera-rig"
import { DustMotes, LightEffects, LightSource, SceneLights } from "./light-rays"
import VoxelWall from "./wall"

interface VoxelWallSceneProps {
  className?: string
  height?: string | number
}

function SceneContents() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const [sun, setSun] = useState<THREE.Mesh | null>(null)

  useLayoutEffect(() => {
    if (sunRef.current) setSun(sunRef.current)
  }, [])

  return (
    <>
      <SceneLights />
      <VoxelWall />
      <LightSource ref={sunRef} />
      <DustMotes />
      <CameraRig />
      {sun && <LightEffects sun={sun} />}
    </>
  )
}

export default function VoxelWallScene({
  className,
  height = "100%",
}: VoxelWallSceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={className}
      style={{ width: "100%", height, background: "#000000" }}
    >
      {mounted ? (
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [0.15, -2.35, 4.2], fov: 52, near: 0.1, far: 40 }}
          gl={{
            antialias: false,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 6, 22]} />
          <Suspense fallback={null}>
            <SceneContents />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  )
}
