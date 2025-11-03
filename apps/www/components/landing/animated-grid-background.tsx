'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Beam from './beam'

const GRID_SIZE = 200

const calculateBeamProps = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 200) / Math.PI

  return {
    x: start.x,
    y: start.y,
    angle,
    distance,
  }
}

interface AnimatedGridBackgroundProps {
  gridSize?: number
  className?: string
  children?: React.ReactNode
}

export const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({
  gridSize = GRID_SIZE,
  className,
  children,
}) => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update grid points when dimensions change
  useEffect(() => {
    const { width, height } = dimensions
    const cols = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)
    const generatedPoints = []

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        generatedPoints.push({ x: col * gridSize, y: row * gridSize })
      }
    }

    setPoints(generatedPoints)
  }, [dimensions, gridSize])

  // Function to generate connections from one point to nearby points
  const generateConnections = (index: number) => {
    if (index === null || index < 0 || index >= points.length) return []

    const currentPoint = points[index]
    const connections = []

    for (let i = 0; i < points.length; i++) {
      if (i === index) continue

      const dx = points[i].x - currentPoint.x
      const dy = points[i].y - currentPoint.y

      // Horizontal or vertical neighbors only (no diagonals)
      const isHorizontal = dy === 0 && Math.abs(dx) === gridSize
      const isVertical = dx === 0 && Math.abs(dy) === gridSize

      if (isHorizontal || isVertical) {
        connections.push(i)
      }
    }

    return connections
  }

  return (
    <div className={cn('relative overflow-visible', className)}>
      {/* --- Background layers (absolute, non-interactive) --- */}
      <div
        // apply opacity / pointer-events to the background wrapper — not the children
        className='absolute inset-0 pointer-events-none opacity-45'
        aria-hidden
      >
        {/* Grid Background */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-size-[200px_200px]',
            'bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
            'transition-colors duration-300'
          )}
        />

        {/* Grid Dots */}
        <div className='absolute inset-0 overflow-hidden'>
          {points.map((point, i) => (
            <div
              key={i}
              className='absolute transition-transform duration-300'
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className='h-6 w-6 rounded-full bg-black/20 dark:bg-neutral-400/20 flex justify-center items-center transition-colors duration-300'>
                <div className='h-2 w-2 rounded-full bg-black/40 dark:bg-neutral-400/40 shadow-md transition-colors duration-300' />
              </div>
            </div>
          ))}
        </div>

        {/* Beams between points */}
        <div className='absolute inset-0'>
          {points.map((_, i) => (
            <div
              key={i}
              className='absolute inset-0 overflow-hidden pointer-events-none'
            >
              {generateConnections(i).map((targetIndex) => {
                const start = points[i]
                const end = points[targetIndex]
                const beamProps = calculateBeamProps(start, end)

                return (
                  <Beam
                    key={`${i}-${targetIndex}`}
                    className='origin-left'
                    style={{
                      left: `${beamProps.x}px`,
                      top: `${beamProps.y}px`,
                      transform: `rotate(${i % 2 === 0 ? 90 : 0}deg)`,
                      width: `${beamProps.distance}px`,
                    }}
                    width={beamProps.distance}
                    index={i}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Radial Mask */}
        <div className='absolute inset-0 flex items-center justify-center bg-white dark:bg-black mask-[radial-gradient(ellipse_at_center,transparent_10%,black)] transition-colors duration-300' />
      </div>

      {/* --- Children: on top, interactive --- */}
      <div className='relative z-10 pointer-events-auto'>{children}</div>
    </div>
  )
}
