"use client"

import { Cursor } from "@/registry/gammaui/inverted-cursor"

export default function CursorDemo() {
  return (
    <div className="relative h-96 w-full cursor-none overflow-hidden">
      {/* Custom circular inverted color cursor */}
      <Cursor />

      {/* Main content centered vertically and horizontally */}
      <main className="flex h-full items-center justify-center">
        <h1 className="text-4xl font-extrabold select-none">Move your mouse</h1>
      </main>
    </div>
  )
}
