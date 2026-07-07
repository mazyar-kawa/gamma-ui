"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const SPACING = 0.44
const CUBE = 0.38
const ROOM_W = 9.2
const ROOM_H = 6.4
const ROOM_D = 10.5

const HOLE_CX = 0.55
const HOLE_CY = 0.85
const HOLE_W = 3.4
const HOLE_H = 2.55

interface CubeInstance {
  x: number
  y: number
  z: number
  rotX: number
  rotY: number
  rotZ: number
  scale: number
  jitter: boolean
  phase: number
  driftSpeed: number
  maxDrift: number
}

const LIGHT_TARGET = {
  x: HOLE_CX,
  y: HOLE_CY,
  z: -ROOM_D - 0.35,
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function isInHole(
  x: number,
  y: number,
  z: number,
  rand: () => number
): false | true | "debris" {
  const backZ = -ROOM_D
  if (Math.abs(z - backZ) > SPACING * 0.6) return false

  const dx = Math.abs(x - HOLE_CX)
  const dy = Math.abs(y - HOLE_CY)

  const inside = dx < HOLE_W / 2 && dy < HOLE_H / 2
  if (!inside) return false

  const edgeDist = Math.min(HOLE_W / 2 - dx, HOLE_H / 2 - dy)

  if (edgeDist < SPACING * 0.85) {
    if (rand() < 0.42) return true
    if (rand() < 0.72) return "debris"
    return false
  }

  if (edgeDist < SPACING * 1.6 && rand() < 0.38) return "debris"

  return true
}

function pushCube(
  cubes: CubeInstance[],
  x: number,
  y: number,
  z: number,
  rand: () => number,
  edge = false,
  debris = false
) {
  const spread = edge || debris ? 0.22 : 0.06
  const bx = x + (rand() - 0.5) * spread
  const by = y + (rand() - 0.5) * spread
  const bz = z + (rand() - 0.5) * (debris ? 0.5 : spread)

  const dx = LIGHT_TARGET.x - bx
  const dy = LIGHT_TARGET.y - by
  const dz = LIGHT_TARGET.z - bz
  const dist = Math.hypot(dx, dy, dz)

  cubes.push({
    x: bx,
    y: by,
    z: bz,
    rotX: edge || debris ? (rand() - 0.5) * 0.7 : 0,
    rotY: edge || debris ? (rand() - 0.5) * 0.9 : 0,
    rotZ: edge || debris ? (rand() - 0.5) * 0.55 : 0,
    scale:
      CUBE *
      (debris
        ? 0.65 + rand() * 0.45
        : edge
          ? 0.78 + rand() * 0.35
          : 0.92 + rand() * 0.12),
    jitter: edge || debris,
    phase: rand() * Math.PI * 2,
    driftSpeed: debris
      ? 0.18 + rand() * 0.14
      : edge
        ? 0.1 + rand() * 0.07
        : 0.03 + rand() * 0.025,
    maxDrift: debris ? dist * 0.98 : edge ? dist * 0.55 : dist * 0.18,
  })
}

function generateTunnel(): CubeInstance[] {
  const rand = mulberry32(481516)
  const cubes: CubeInstance[] = []

  const halfW = ROOM_W / 2
  const halfH = ROOM_H / 2
  const backZ = -ROOM_D

  for (let z = 0; z >= backZ; z -= SPACING) {
    for (let x = -halfW; x <= halfW; x += SPACING) {
      const hole = isInHole(x, -halfH, z, rand)
      if (hole === true) continue
      if (hole === "debris") {
        pushCube(cubes, x, -halfH, z + rand() * 0.4, rand, true, true)
        continue
      }
      pushCube(cubes, x, -halfH, z, rand, z < backZ + SPACING * 2)
    }
  }

  for (let z = 0; z >= backZ; z -= SPACING) {
    for (let x = -halfW; x <= halfW; x += SPACING) {
      const hole = isInHole(x, halfH, z, rand)
      if (hole === true) continue
      if (hole === "debris") {
        pushCube(cubes, x, halfH, z + rand() * 0.3, rand, true, true)
        continue
      }
      pushCube(cubes, x, halfH, z, rand)
    }
  }

  for (let z = 0; z >= backZ; z -= SPACING) {
    for (let y = -halfH; y <= halfH; y += SPACING) {
      const hole = isInHole(-halfW, y, z, rand)
      if (hole === true) continue
      if (hole === "debris") {
        pushCube(cubes, -halfW, y, z + rand() * 0.35, rand, true, true)
        continue
      }
      pushCube(cubes, -halfW, y, z, rand, z < backZ + SPACING * 3)
    }
  }

  for (let z = 0; z >= backZ; z -= SPACING) {
    for (let y = -halfH; y <= halfH; y += SPACING) {
      if (Math.abs(y) < 0.2 && z > backZ + SPACING * 4 && rand() < 0.18)
        continue
      const hole = isInHole(halfW, y, z, rand)
      if (hole === true) continue
      if (hole === "debris") {
        pushCube(cubes, halfW, y, z + rand() * 0.35, rand, true, true)
        continue
      }
      pushCube(cubes, halfW, y, z, rand, z < backZ + SPACING * 2)
    }
  }

  for (let y = -halfH; y <= halfH; y += SPACING) {
    for (let x = -halfW; x <= halfW; x += SPACING) {
      const hole = isInHole(x, y, backZ, rand)
      if (hole === true) continue
      if (hole === "debris") {
        pushCube(
          cubes,
          x + (rand() - 0.5) * 0.35,
          y + (rand() - 0.5) * 0.35,
          backZ + rand() * 0.8,
          rand,
          true,
          true
        )
        continue
      }

      const nearHole =
        Math.abs(x - HOLE_CX) < HOLE_W / 2 + SPACING * 1.5 &&
        Math.abs(y - HOLE_CY) < HOLE_H / 2 + SPACING * 1.5
      pushCube(cubes, x, y, backZ, rand, nearHole)
    }
  }

  for (let i = 0; i < 28; i++) {
    pushCube(
      cubes,
      HOLE_CX + (rand() - 0.5) * HOLE_W * 1.1,
      HOLE_CY + (rand() - 0.5) * HOLE_H * 1.1,
      backZ + 0.4 + rand() * 2.2,
      rand,
      true,
      true
    )
  }

  return cubes
}

export default function VoxelWall() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const instances = useMemo(() => generateTunnel(), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    instances.forEach((cube, i) => {
      dummy.position.set(cube.x, cube.y, cube.z)
      dummy.rotation.set(cube.rotX, cube.rotY, cube.rotZ)
      dummy.scale.setScalar(cube.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [instances, dummy])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.elapsedTime

    instances.forEach((cube, i) => {
      const dx = LIGHT_TARGET.x - cube.x
      const dy = LIGHT_TARGET.y - cube.y
      const dz = LIGHT_TARGET.z - cube.z
      const dist = Math.hypot(dx, dy, dz) || 1

      const cycle = (t * cube.driftSpeed + cube.phase) % 1
      const eased = cycle * cycle * (3 - 2 * cycle)
      const suck = eased * eased
      const pull = suck * cube.maxDrift

      const px = cube.x + (dx / dist) * pull
      const py = cube.y + (dy / dist) * pull
      const pz = cube.z + (dz / dist) * pull

      const wobble = cube.jitter
        ? Math.sin(t * 1.4 + cube.phase) * 0.012 * (1 - suck * 0.6)
        : Math.sin(t * 0.6 + cube.phase) * 0.004 * (1 - suck * 0.4)

      dummy.position.set(
        px + Math.sin(t * 0.7 + cube.phase) * 0.003 * (1 - suck),
        py + wobble,
        pz
      )
      dummy.rotation.set(
        cube.rotX + suck * 0.5 + Math.sin(t + cube.phase) * 0.01,
        cube.rotY + suck * 0.8,
        cube.rotZ + suck * 0.4 + Math.cos(t * 1.1 + cube.phase) * 0.01
      )
      dummy.scale.setScalar(
        cube.scale * (1 - suck * (cube.jitter ? 0.55 : 0.3))
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, instances.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#050505" roughness={0.98} metalness={0.02} />
    </instancedMesh>
  )
}

export const HOLE_CENTER = new THREE.Vector3(HOLE_CX, HOLE_CY, -ROOM_D - 0.35)

export const HOLE_SIZE = {
  width: HOLE_W * 0.95,
  height: HOLE_H * 0.95,
}

export const LIGHT_ORIGIN = new THREE.Vector3(
  HOLE_CX + 0.9,
  HOLE_CY + 1.4,
  -ROOM_D - 2.2
)

export const ROOM_DEPTH = ROOM_D
