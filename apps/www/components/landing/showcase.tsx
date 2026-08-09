import { SectionHeader } from "@/components/landing/section-header"
import { ShowcaseMarquee } from "@/components/landing/showcase-marquee"
import { ShowcaseSitesMarquee } from "@/components/landing/showcase-sites-marquee"

function Showcase() {
  return (
    <section className="border-border/60 border-t">
      <ShowcaseMarquee />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          label="03 — Showcase"
          title="Websites in the wild"
          description="A rolling gallery of sites — each card shows the preview, name, and type (studio, personal, product, and more)."
          className="mb-10 max-w-3xl"
        />
        <ShowcaseSitesMarquee />
      </div>

      <ShowcaseMarquee />
    </section>
  )
}

export default Showcase
