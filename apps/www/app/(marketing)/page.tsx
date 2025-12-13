import Components from "@/components/landing/components"
import Features from "@/components/landing/features"
import Hero from "@/components/landing/hero"

export default function Home() {
  return (
    <div className="bg-background flex flex-col">
      <Hero />
      <Components />
      <Features />
    </div>
  )
}
