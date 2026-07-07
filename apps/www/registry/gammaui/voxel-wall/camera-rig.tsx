"use client"

import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { HOLE_CENTER } from "./wall"

const BASE_POSITION = new THREE.Vector3(0.15, -2.35, 4.2)
const LOOK_TARGET = new THREE.Vector3(
  HOLE_CENTER.x,
  HOLE_CENTER.y - 0.1,
  HOLE_CENTER.z + 1.5
)

export default function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 })
  const { camera } = useThree()

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    const swayX = Math.sin(t * 0.18) * 0.05 + Math.cos(t * 0.14) * 0.03
    const swayY = Math.cos(t * 0.16) * 0.025 + Math.sin(t * 0.11) * 0.018
    const parallaxX = mouse.current.x * 0.18
    const parallaxY = mouse.current.y * 0.1

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      BASE_POSITION.x + swayX + parallaxX,
      0.05
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      BASE_POSITION.y + swayY + parallaxY * 0.35,
      0.05
    )
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      BASE_POSITION.z + Math.sin(t * 0.12) * 0.06,
      0.04
    )

    const lookAt = LOOK_TARGET.clone()
    lookAt.x += parallaxX * 0.12
    lookAt.y += parallaxY * 0.08
    camera.lookAt(lookAt)
  })

  return null
}
