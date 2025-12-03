import { AnimatedListDemo } from "@/registry/example/animated-list-demo"
import BorderButtonDemo from "@/registry/example/border-button-demo"
import LiveWaveformDemo from "@/registry/example/live-waveform-demo"
import OverlayButtonDemo from "@/registry/example/overlay-button-demo"
import { Badge } from "@/registry/gammaui/badge"
import { PixelButton } from "@/registry/gammaui/pixel-button"
import PricingInteraction from "@/registry/gammaui/pricing-interaction"
import TextRoll from "@/registry/gammaui/text-roll"

const Components = () => {
  return (
    <div className="mx-auto my-10 flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 w-full max-w-4xl text-center">
        <h1 className="mb-4 bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30">
          Create Stunning Interfaces. No Restrictions.
        </h1>
        <p className="mx-auto max-w-2xl bg-linear-to-br from-black/70 via-black/70 to-black/30 bg-clip-text text-sm text-balance text-transparent sm:text-base md:text-lg dark:from-white/70 dark:via-white/70 dark:to-white/30">
          Gamma UI delivers high-performance, accessible, and fully customizable
          components so you can ship beautiful, responsive designs with ease.
        </p>
      </div>

      {/* Grid Section */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {/* Large Feature - Takes full width on mobile, 2 cols on md, 6 cols on lg */}
          <div className="flex flex-col gap-4 sm:gap-6 md:col-span-2 lg:col-span-6">
            <div className="w-full">
              <PricingInteraction />
            </div>
            <div className="w-full">
              <AnimatedListDemo />
            </div>
          </div>

          {/* Middle Column - Takes full width on mobile, 1 col on md, 3 cols on lg */}
          <div className="flex flex-col gap-4 sm:gap-6 md:col-span-1 lg:col-span-3">
            <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <TextRoll
                center
                className="text-3xl leading-tight font-extrabold tracking-tight uppercase transition-colors sm:text-4xl lg:text-5xl"
              >
                Hover Me
              </TextRoll>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex flex-wrap gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div className="w-full">
              <PixelButton color="#ff5722">Pixel Button</PixelButton>
            </div>
          </div>

          {/* Right Column - Takes full width on mobile, 1 col on md, 3 cols on lg */}
          <div className="flex flex-col gap-4 sm:gap-6 md:col-span-1 lg:col-span-3">
            <BorderButtonDemo />
            <OverlayButtonDemo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Components
