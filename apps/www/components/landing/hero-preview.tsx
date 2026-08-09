"use client"

import VoxelWallScene from "@/registry/gammaui/voxel-wall/scene"

export function HeroPreview() {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden
        className="border-primary/20 from-primary/5 absolute -inset-4 rounded-[2rem] border bg-linear-to-br to-transparent blur-sm"
      />
      <div className="border-border/80 bg-card/40 relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm">
        <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-emerald-400/90" />
          <span className="text-muted-foreground ml-2 font-mono text-[10px] tracking-wide uppercase">
            voxel wall · webgl
          </span>
        </div>
        <div className="relative h-[280px] sm:h-[340px] lg:h-[420px]">
          <VoxelWallScene />
          <div className="from-background/90 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent" />
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-xs sm:text-left">
        One of 30+ motion-ready components in the registry.
      </p>
    </div>
  )
}
