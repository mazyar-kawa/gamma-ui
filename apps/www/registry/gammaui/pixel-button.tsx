'use client'

import React, { useEffect, useRef, useState } from 'react'

interface PixelButtonProps {
  children: React.ReactNode
  color?: string
}

export const PixelButton: React.FC<PixelButtonProps> = ({ children, color = '#ff5722' }) => {
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
    pixelContainer.innerHTML = ''

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pixel = document.createElement('div')
        pixel.className =
          'absolute w-[10px] h-[10px] border border-black/25 opacity-0 transition-opacity duration-500 ease-in-out'
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
    const pixels = containerRef.current?.querySelectorAll<HTMLDivElement>('div')
    if (!pixels) return
    pixels.forEach((pixel) => {
      pixel.style.opacity = hovered ? '1' : '0'
    })
  }, [hovered])

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-[180px] h-[60px] rounded-[10px] dark:bg-white dark:text-black text-white bg-black cursor-pointer text-xl tracking-[0.1em] font-normal uppercase shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden"
    >
      <span className="relative z-10">{children}</span>
      <div
        ref={containerRef}
        className="absolute inset-0 z-1 pointer-events-none rounded-[10px] overflow-hidden"
      />
    </button>
  )
}