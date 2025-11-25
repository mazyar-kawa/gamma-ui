"use client"

import React from "react"

import { cn } from "@/lib/utils"
import WavePath from "@/registry/gammaui/wave-path"

export default function Demo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]"
        )}
      />

      <div className="flex w-full flex-col items-end">
        <WavePath className="mb-10" />
        <div className="flex w-full flex-col items-end">
          <div className="flex justify-end">
            <p className="text-muted-foreground mt-2 text-sm">World of Art</p>
            <p className="text-foreground/80 ml-8 w-3/4 text-2xl md:text-4xl">
              Experience the emotions of artists through their works. Let the
              beauty of art inspire you and fill your soul.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
