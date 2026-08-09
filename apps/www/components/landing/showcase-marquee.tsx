import { SHOWCASE_MARQUEE } from "@/config/showcase"

function MarqueeTextTrack({ suffix }: { suffix: string }) {
  return (
    <div className="flex shrink-0 gap-10 pr-10">
      {SHOWCASE_MARQUEE.map((item) => (
        <span
          key={`${item}-${suffix}`}
          className="text-muted-foreground font-mono text-xs tracking-[0.25em] uppercase"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function ShowcaseMarquee() {
  return (
    <div className="border-border/60 group relative overflow-hidden border-y py-3.5">
      <div className="animate-landing-marquee flex w-max will-change-transform group-hover:[animation-play-state:paused]">
        <MarqueeTextTrack suffix="a" />
        <div aria-hidden>
          <MarqueeTextTrack suffix="b" />
        </div>
      </div>
    </div>
  )
}
