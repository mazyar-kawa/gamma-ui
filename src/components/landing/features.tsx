import { cn } from '@/lib/utils'
import { IconStackBack, IconTerminal } from '@tabler/icons-react'
import Terminal from '../ui/terminal'
import { TextShimmerWave } from '../ui/text-shimmer-wave'

export const SkeletonOne = () => {
  return (
    <div className='relative overflow-hidden mt-4 h-40 w-full'>
      <div
        className='flex items-center justify-center gap-20 h-[200%] absolute -inset-x-[150%] -inset-y-20 bg-size-[40px_40px] bg-[linear-gradient(to_right,var(--color-neutral-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,var(--color-neutral-700)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-700)_1px,transparent_1px)] mask-radial-from-50% mask-t-from-50% mask-b-from-50%'
        style={{
          transform: 'rotateY(20deg) rotateX(50deg) rotateZ(40deg)',
        }}
      ></div>
      <div className='relative z-10 p-4 flex flex-col items-center justify-center h-full text-black dark:text-white'>
        <TextShimmerWave
          className={cn(
            '[--base-color:#a1a1aa] [--base-gradient-color:#000]',
            'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]'
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
    icon: <IconTerminal className='text-black dark:text-white' />,
    title: 'Gamma/ui CLI',
    description:
      'GammaUI integrates seamlessly with shadcn/ui, offering enhanced components and tools to elevate your design and development workflow.',
    skeleton: <SkeletonOne />,
  },
  {
    id: 2,
    icon: <IconStackBack className='text-black dark:text-white' />,
    title: 'Build with GammaUI',
    description:
      'Comprehensive documentation for GammaUI, including installation guides, component usage, and customization options.',
    skeleton: (
      <div>
        <Terminal
          command='npx shadcn@latest add'
          steps={[
            { text: '~ Project name', bold: true },
            { text: ' | terminal-demo' },
            { text: ' | cd terminal-demo' },
            { text: '~ Installing UI components', bold: true },
            { text: ' | ✓ gamma/ui' },
            { text: ' | ✓ shadcn/ui' },
          ]}
          pulseInterval={200}
          showLocalhost={true}
          hostBarTitle='localhost:3000'
          hostMessage='New App Created!'
        />
      </div>
    ),
  },
]

const Features = () => {
  return (
    <div className='flex flex-col items-center  my-10 px-4 max-w-7xl mx-auto'>
      <h1 className='text-4xl sm:text-2xl md:text-4xl font-extrabold text-center bg-linear-to-br from-gray-900 to-gray-700 dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30 bg-clip-text text-transparent max-w-lg'>
        Powered by Simplicity, Crafted with Intent
      </h1>
      <p className='my-6 max-w-sm text-balance bg-linear-to-br from-black/70 via-black/70 to-black/30 dark:from-white/70 dark:via-white/70 dark:to-white/30 bg-clip-text text-center text-[0.87rem] text-transparent sm:max-w-3xl md:text-[1.15rem]'>
        Built for simplicity, designed for effortless creation — that’s GammaUI.
      </p>
      <div className='grid gap-4 md:grid-cols-2 p-4 screen-line-after'>
        {MYPROJECT.map((project) => (
          <div
            key={project.id}
            className={cn(
              'rounded-sm  transition duration-200 p-8 border justify-between flex flex-col cursor-pointer',
              // Light mode styles
              'bg-linear-to-br from-gray-50 via-white to-gray-100 border-gray-200 shadow-md',
              // Dark mode styles
              'dark:bg-linear-to-br dark:from-zinc-900 dark:via-transparent dark:to-zinc-900/60 dark:border-white/20 dark:shadow-none dark:inset-shadow-[1px_1px_1px,0px_0px_1px] dark:inset-shadow-white/15'
            )}
          >
            <div className='transition duration-200 flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                {project?.icon}
                <h1 className='max-w-xs text-md text-gray-900 dark:text-slate-100'>
                  {project?.title}
                </h1>
              </div>
              <p
                className={cn(
                  'text-sm md:text-base text-left mx-auto',
                  'text-gray-600 dark:text-neutral-300',
                  'text-center font-normal',
                  'text-left mx-0 md:text-sm my-2'
                )}
              >
                {project?.description}
              </p>
              <div className='h-full w-full'>{project.skeleton}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
