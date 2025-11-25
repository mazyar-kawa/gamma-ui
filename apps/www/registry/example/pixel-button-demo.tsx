"use client"

import { PixelButton } from "@/registry/gammaui/pixel-button"

export default function PixelButtonDemo() {
  return (
    <div className="z-10 flex h-full w-full justify-center gap-6">
      <PixelButton color="#ff5722">Pixel</PixelButton>
      <PixelButton color="#03a9f4">Button</PixelButton>
      <PixelButton color="#4caf50">Hover Me</PixelButton>
    </div>
  )
}
