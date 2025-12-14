import { LocationMap } from "@/registry/gammaui/location-map"

export default function LocationMapDemo() {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Optional subtle label */}
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-600 uppercase">
          Current Location
        </p>

        <LocationMap
          location="Berlin, Germany"
          coordinates="52.5200° N, 13.4050° E"
        />
      </div>
    </main>
  )
}
