"use client"

import AuroraGlass from "@/registry/gammaui/aurora-glass"

export const AuroraGlassDemo = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <AuroraGlass
        speed={1}
        tileDensity={5}
        rippleLayers={8}
        warpStrength={0.33}
        bandSharpness={3}
        colorA="#001eff"
        colorB="#00bcff"
        backgroundColor="#000"
      />
    </div>
  )
}
