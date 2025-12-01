import { AnimatedListDemo } from "@/registry/example/animated-list-demo"
import BorderButtonDemo from "@/registry/example/border-button-demo"
import LiveWaveformDemo from "@/registry/example/live-waveform-demo"
import OverlayButtonDemo from "@/registry/example/overlay-button-demo"
import PixelButtonDemo from "@/registry/example/pixel-button-demo"
import { Badge } from "@/registry/gammaui/badge"
import BorderButton from "@/registry/gammaui/border-button"
import { PixelButton } from "@/registry/gammaui/pixel-button"
import TextRoll from "@/registry/gammaui/text-roll"

const Components = () => {
  return (
    <div className="mx-auto my-10 flex max-w-7xl flex-col items-center px-4">
      <h1 className="max-w-lg bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:text-2xl md:text-4xl dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30">
        Create Stunning Interfaces. No Restrictions.
      </h1>
      <p className="my-6 max-w-sm bg-linear-to-br from-black/70 via-black/70 to-black/30 bg-clip-text text-center text-[0.87rem] text-balance text-transparent sm:max-w-3xl md:text-[1.15rem] dark:from-white/70 dark:via-white/70 dark:to-white/30">
        Gamma UI delivers high-performance, accessible, and fully customizable
        components so you can ship beautiful, responsive designs with ease.
      </p>
      <div className="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
        <div className="col-span-2 flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
          <LiveWaveformDemo />
          <AnimatedListDemo />
        </div>
        <div className="flex flex-col items-center-safe gap-6 *:[div]:w-full *:[div]:max-w-full">
          <div className="text relative flex flex-col items-center justify-center">
            <TextRoll
              center
              className="text-4xl leading-[0.8] font-extrabold tracking-[-0.03em] uppercase transition-colors lg:text-5xl"
            >
              Hover Me
            </TextRoll>
          </div>
          <div className="mx-auto flex flex-col items-center gap-2">
            <div className="flex w-full flex-wrap gap-2">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          <PixelButton color="#ff5722">Pixel</PixelButton>
        </div>
        <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
          <div>slaw</div>
          <div>slaw</div>
        </div>
      </div>
    </div>
  )
}

export default Components
