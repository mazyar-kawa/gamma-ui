import { IconStackBack, IconTerminal } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

import Terminal from "../ui/terminal"
import { TextShimmerWave } from "../ui/text-shimmer-wave"

export const SkeletonOne = () => {
  return (
    <div className="relative mt-4 h-40 w-full overflow-hidden">
      <div
        className="absolute -inset-x-[150%] -inset-y-20 flex h-[200%] items-center justify-center gap-20 bg-[linear-gradient(to_right,var(--color-neutral-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-200)_1px,transparent_1px)] mask-t-from-50% mask-b-from-50% mask-radial-from-50% bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,var(--color-neutral-700)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-700)_1px,transparent_1px)]"
        style={{
          transform: "rotateY(20deg) rotateX(50deg) rotateZ(40deg)",
        }}
      ></div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-black dark:text-white">
        <TextShimmerWave
          className={cn(
            "[--base-color:#a1a1aa] [--base-gradient-color:#000]",
            "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]"
          )}
          duration={1}
          spread={1}
          zDistance={1}
          scaleDistance={1.1}
          rotateYDistance={20}
        >
          npx shadcn@latest add
        </TextShimmerWave>
      </div>
    </div>
  )
}

const MYPROJECT = [
  {
    id: 1,
    icon: <IconTerminal className="text-black dark:text-white" />,
    title: "Gamma/ui CLI",
    description:
      "GammaUI integrates seamlessly with shadcn/ui, offering enhanced components and tools to elevate your design and development workflow.",
    skeleton: <SkeletonOne />,
  },
  {
    id: 2,
    icon: <IconStackBack className="text-black dark:text-white" />,
    title: "Build with GammaUI",
    description:
      "Comprehensive documentation for GammaUI, including installation guides, component usage, and customization options.",
    skeleton: (
      <div>
        <Terminal
          command="npx shadcn@latest add"
          steps={[
            { text: "~ Project name", bold: true },
            { text: " | terminal-demo" },
            { text: " | cd terminal-demo" },
            { text: "~ Installing UI components", bold: true },
            { text: " | ✓ gamma/ui" },
            { text: " | ✓ shadcn/ui" },
          ]}
          pulseInterval={200}
          showLocalhost={true}
          hostBarTitle="localhost:3000"
          hostMessage="New App Created!"
        />
      </div>
    ),
  },
]

const Features = () => {
  return (
    <div className="mx-auto my-10 flex max-w-7xl flex-col items-center px-4">
      <h1 className="max-w-lg bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:text-2xl md:text-4xl dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30">
        Powered by Simplicity, Crafted with Intent
      </h1>
      <p className="my-6 max-w-sm bg-linear-to-br from-black/70 via-black/70 to-black/30 bg-clip-text text-center text-[0.87rem] text-balance text-transparent sm:max-w-3xl md:text-[1.15rem] dark:from-white/70 dark:via-white/70 dark:to-white/30">
        Built for simplicity, designed for effortless creation — that’s GammaUI.
      </p>
      <div className="screen-line-after grid gap-4 p-4 md:grid-cols-2">
        {MYPROJECT.map((project) => (
          <div
            key={project.id}
            className={cn(
              "flex cursor-pointer flex-col justify-between rounded-sm border p-8 transition duration-200",
              // Light mode styles
              "border-gray-200 bg-linear-to-br from-gray-50 via-white to-gray-100 shadow-md",
              // Dark mode styles
              "dark:border-white/20 dark:bg-linear-to-br dark:from-zinc-900 dark:via-transparent dark:to-zinc-900/60 dark:shadow-none dark:inset-shadow-[1px_1px_1px,0px_0px_1px] dark:inset-shadow-white/15"
            )}
          >
            <div className="flex flex-col gap-4 transition duration-200">
              <div className="flex items-center gap-2">
                {project?.icon}
                <h1 className="text-md max-w-xs text-gray-900 dark:text-slate-100">
                  {project?.title}
                </h1>
              </div>
              <p
                className={cn(
                  "mx-auto text-left text-sm md:text-base",
                  "text-gray-600 dark:text-neutral-300",
                  "text-center font-normal",
                  "mx-0 my-2 text-left md:text-sm"
                )}
              >
                {project?.description}
              </p>
              <div className="h-full w-full">{project.skeleton}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
