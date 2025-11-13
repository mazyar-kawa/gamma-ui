"use client";

import { Cursor } from "@/registry/gammaui/inverted-cursor";

export default function CursorDemo() {
  return (
    <div className="relative w-full h-96 overflow-hidden cursor-none">
      {/* Custom circular inverted color cursor */}
      <Cursor />

      {/* Main content centered vertically and horizontally */}
      <main className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-extrabold select-none">
          Move your mouse
        </h1>
      </main>
    </div>
  );
}
