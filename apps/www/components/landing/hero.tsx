import Link from "next/link"
import { IconArrowRight, IconSparkles } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

import { HeroPreview } from "./hero-preview"
import { Stacks } from "./stacks"

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[24px_24px] opacity-60"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-16 lg:pb-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="border-border/70 bg-muted/50 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
            <IconSparkles className="text-primary size-3.5" stroke={2} />
            Open source component library
          </div>

          <h1 className="text-foreground max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Interface craft for{" "}
            <span className="from-primary via-chart-2 to-primary bg-linear-to-r bg-clip-text text-transparent">
              modern React
            </span>{" "}
            teams
          </h1>

          <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed text-pretty sm:text-lg">
            Gamma UI pairs Tailwind and Motion with a shadcn-compatible CLI.
            Copy production-ready blocks — from WebGL backgrounds to dense app
            chrome — without fighting your stack.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-11 rounded-full px-7">
              <Link href="/components">
                Browse components
                <IconArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-7"
            >
              <Link href="/docs/introduction">Documentation</Link>
            </Button>
          </div>

          <Stacks variant="row" className="mt-10 w-full lg:justify-start" />
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}

export default Hero
