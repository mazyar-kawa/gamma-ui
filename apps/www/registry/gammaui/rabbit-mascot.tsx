"use client"

import { useEffect, useId, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { applyRabbitArmReach } from "@/registry/gammaui/rabbit-mascot-arm"
import { startRabbitBlinkLoop } from "@/registry/gammaui/rabbit-mascot-blink"
import {
  applyRabbitMood,
  type RabbitMood,
} from "@/registry/gammaui/rabbit-mascot-moods"

interface RabbitMascotProps {
  mood?: RabbitMood
  className?: string
  size?: number
  blink?: boolean
  armReach?: boolean
  onClick?: () => void
  onReady?: () => void
}

export function RabbitMascot({
  mood = "neutral",
  className,
  size = 280,
  blink = true,
  armReach = false,
  onClick,
  onReady,
}: RabbitMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const moodRef = useRef(mood)
  const onReadyRef = useRef(onReady)
  const isLoadedRef = useRef(false)
  const instanceId = useId().replace(/:/g, "")
  const idPrefix = `rabbit-${instanceId}-`
  const [isLoaded, setIsLoaded] = useState(false)

  moodRef.current = mood
  onReadyRef.current = onReady

  useEffect(() => {
    let cancelled = false

    async function loadMascot() {
      const response = await fetch("/rabbit.svg")
      if (!response.ok || cancelled || !containerRef.current) return

      const markup = (await response.text()).replace(/_r_0_/g, idPrefix)
      containerRef.current.innerHTML = markup

      const svg = containerRef.current.querySelector("svg")
      if (!svg) return

      svg.style.display = "block"
      svg.style.overflow = "visible"
      svg.style.width = "100%"
      svg.style.height = "100%"
      if (onClick) svg.style.cursor = "pointer"

      applyRabbitMood(svg, moodRef.current)
      applyRabbitArmReach(svg, armReach)

      isLoadedRef.current = true
      setIsLoaded(true)
      onReadyRef.current?.()
    }

    loadMascot()

    return () => {
      cancelled = true
      isLoadedRef.current = false
    }
  }, [idPrefix, onClick])

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return
    applyRabbitMood(containerRef.current, mood)
  }, [isLoaded, mood])

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return
    applyRabbitArmReach(containerRef.current, armReach)
  }, [isLoaded, armReach])

  useEffect(() => {
    if (!isLoaded || !blink || !containerRef.current) return

    return startRabbitBlinkLoop(containerRef.current, () => moodRef.current)
  }, [isLoaded, blink])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-live="polite"
      aria-label={`Rabbit mascot, ${mood} mood`}
      className={cn(
        "form-companion-mascot inline-block select-none",
        className
      )}
      style={{ width: size, height: size * (720 / 900) }}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
    />
  )
}

export {
  RABBIT_MOODS,
  RABBIT_MOOD_LABELS,
  type RabbitMood,
} from "@/registry/gammaui/rabbit-mascot-moods"
