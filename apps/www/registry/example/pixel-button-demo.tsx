'use client'

import { PixelButton } from '@/registry/gammaui/pixel-button'

export default function PixelButtonDemo() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 relative overflow-hidden bg-white text-center dark:bg-gray-950 transition-colors duration-300">
      {/* Background grid */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px)]
        dark:bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-size-[:50px_50px]
        z-0
      " />

      {/* Header */}
      <div className="mb-8 z-10">
        <h1 className="text-5xl font-bold text-black mb-4 dark:text-white transition-colors duration-300">
          Pixel Hover Effects
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl px-4 dark:text-gray-300 transition-colors duration-300">
          Experience the mesmerizing pixel animation effect. Hover over the buttons below
          to watch as individual pixels fade in with random delays, creating a dynamic
          and engaging visual experience.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 z-10">
        <PixelButton color="#ff5722">Pixel</PixelButton>
        <PixelButton color="#03a9f4">Button</PixelButton>
        <PixelButton color="#4caf50">Hover Me</PixelButton>
      </div>
    </div>
  )
}
