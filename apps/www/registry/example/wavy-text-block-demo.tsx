import { WavyBlock, WavyBlockItem } from "@/registry/gammaui/wavy-text-block"

const titles = [
  "Flexible",
  "Animated",
  "Customizable",
  "Optimized",
  "Lightweight",
  "Responsive",
  "UI Blocks",
]

export default function DemoOne() {
  return (
    <main className="h-screen pt-60">
      <div className="w-full max-w-6xl">
        <WavyBlock className="flex flex-col items-start justify-start gap-6">
          {titles.map((title, index) => (
            <WavyBlockItem key={title} index={index}>
              <h2 className="text-[4rem] leading-none font-bold tracking-tighter whitespace-nowrap uppercase">
                {title}
              </h2>
            </WavyBlockItem>
          ))}
        </WavyBlock>
      </div>
    </main>
  )
}
