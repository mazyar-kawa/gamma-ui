"use client"

import { PixelButton } from "@/registry/gammaui/pixel-button"

export default function PixelButtonDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-white text-center transition-colors duration-300 dark:bg-gray-950">
      {/* Background grid */}
      <div className="bg-size-[:50px_50px] absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]" />

      {/* Header */}
      <div className="z-10 mb-8">
        <h1 className="mb-4 text-5xl font-bold text-black transition-colors duration-300 dark:text-white">
          Pixel Hover Effects
        </h1>
        <p className="max-w-2xl px-4 text-lg text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Experience the mesmerizing pixel animation effect. Hover over the
          buttons below to watch as individual pixels fade in with random
          delays, creating a dynamic and engaging visual experience.
        </p>
      </div>

      {/* Buttons */}
      <div className="z-10 flex flex-col gap-6">
        <PixelButton color="#ff5722">Pixel</PixelButton>
        <PixelButton color="#03a9f4">Button</PixelButton>
        <PixelButton color="#4caf50">Hover Me</PixelButton>
      </div>
    </div>
  )
}
