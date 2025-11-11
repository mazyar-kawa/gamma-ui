'use client'

import { motion } from "motion/react"
import { useState, MouseEvent } from "react"

interface Position {
  x: number
  y: number
}

interface BorderButtonProps {
    label: string
}

export default function BorderButton({label}: BorderButtonProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [positions, setPositions] = useState<Record<number, Position>>({})
  const [opacities, setOpacities] = useState<Record<number, number>>({})

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPositions((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setOpacities((prev) => ({
      ...prev,
      [index]: 1,
    }))
  }

  const handleMouseLeave = () => {
    if (hoveredIndex !== null) {
      setOpacities((prev) => ({
        ...prev,
        [hoveredIndex]: 0,
      }))
    }
    setHoveredIndex(null)
  }

  const i = 0

  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1.5 } as any}
      animate={{ "--x": "-100%" } as any}
      whileTap={{ scale: 0.97 }}
      transition={{
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="relative rounded-xl bg-transparent overflow-hidden radial-gradient-border-button"
    >
      <div
        key={i}
        onMouseMove={(e) => handleMouseMove(e, i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        className="relative px-2 py-1 rounded-xl flex flex-col items-center justify-center"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            // border: "1px solid rgba(255, 255, 255, 0.5)",
            opacity: hoveredIndex === i ? opacities[i] : 0,
            pointerEvents: "none",
            WebkitMaskImage: `radial-gradient(circle 20px at ${positions[i]?.x || 0}px ${positions[i]?.y || 0}px, white 15%, transparent)`,
          }}
           className={`
    absolute inset-0 rounded-xl border 
    transition-opacity duration-500 w-full
    border-sky-500 dark:border-white/40
  `}
        />
        <p className='text-white'>
            {label}
        </p>
      </div>
    </motion.button>
  )
}

