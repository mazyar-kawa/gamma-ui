import LogoCloud from "@/registry/gammaui/logo-cloud"

export default function DemoOne() {
  return (
    <div className="w-full place-content-center px-4">
      <section className="relative mx-auto grid max-w-3xl">
        <h2 className="text-muted-foreground mb-6 text-center text-lg font-medium tracking-tight md:text-2xl">
          Companies we{" "}
          <span className="text-primary font-semibold">collaborate</span> with.
        </h2>

        <LogoCloud />
      </section>
    </div>
  )
}
