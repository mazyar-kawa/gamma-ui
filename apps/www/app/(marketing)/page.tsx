import Components from "@/components/landing/components"
import { CtaSection } from "@/components/landing/cta-section"
import Features from "@/components/landing/features"
import Hero from "@/components/landing/hero"
import Showcase from "@/components/landing/showcase"

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col">
      <Hero />
      <Components />
      <Features />
      <Showcase />
      <CtaSection />
    </div>
  )
}
