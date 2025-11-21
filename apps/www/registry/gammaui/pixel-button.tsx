"use client"

import React, { useEffect, useRef, useState } from "react"

interface PixelButtonProps {
  children: React.ReactNode
  color?: string
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  color = "#ff5722",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const button = buttonRef.current
    const pixelContainer = containerRef.current
    if (!button || !pixelContainer) return

    const pixelSize = 10
    const btnWidth = button.offsetWidth
    const btnHeight = button.offsetHeight
    const cols = Math.floor(btnWidth / pixelSize)
    const rows = Math.floor(btnHeight / pixelSize)

    // Clear old pixels
    pixelContainer.innerHTML = ""

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pixel = document.createElement("div")
        pixel.className =
          "absolute w-[10px] h-[10px] border border-black/25 opacity-0 transition-opacity duration-500 ease-in-out"
        pixel.style.background = color
        pixel.style.left = `${col * pixelSize}px`
        pixel.style.top = `${row * pixelSize}px`
        pixel.style.transitionDelay = `${Math.random() * 0.8}s`
        pixelContainer.appendChild(pixel)
      }
    }
  }, [color])

  useEffect(() => {
    // When hover state changes, toggle opacity
    const pixels = containerRef.current?.querySelectorAll<HTMLDivElement>("div")
    if (!pixels) return
    pixels.forEach((pixel) => {
      pixel.style.opacity = hovered ? "1" : "0"
    })
  }, [hovered])

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-[60px] w-[180px] cursor-pointer overflow-hidden rounded-[10px] bg-black text-xl font-normal tracking-[0.1em] text-white uppercase shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] dark:bg-white dark:text-black"
    >
      <span className="relative z-10">{children}</span>
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden rounded-[10px]"
      />
    </button>
  )
}
