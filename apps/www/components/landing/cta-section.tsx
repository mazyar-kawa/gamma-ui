import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="border-border/60 border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
            Ready when you are
          </p>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Drop components in. Ship faster.
          </h2>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            Same shadcn workflow — copy, paste, customize. Your design system,
            elevated.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-8">
            <Link href="/components">
              Explore library
              <IconArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-8"
          >
            <Link href="/docs/introduction">Read documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
