"use client"

import { SHOWCASE_PROJECTS } from "@/config/showcase"

import { ShowcaseCard } from "./showcase-card"

function ShowcaseMarqueeTrack({ suffix }: { suffix: string }) {
  return (
    <div className="flex shrink-0 gap-5 pr-5">
      {SHOWCASE_PROJECTS.map((project) => (
        <ShowcaseCard key={`${project.id}-${suffix}`} project={project} />
      ))}
    </div>
  )
}

export function ShowcaseSitesMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l to-transparent sm:w-24"
      />

      <div className="group overflow-hidden py-2">
        <div
          className="animate-landing-marquee flex w-max will-change-transform group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "50s" } as React.CSSProperties}
        >
          <ShowcaseMarqueeTrack suffix="a" />
          <div aria-hidden>
            <ShowcaseMarqueeTrack suffix="b" />
          </div>
        </div>
      </div>
    </div>
  )
}
