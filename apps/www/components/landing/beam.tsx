import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useId } from 'react'

const Beam = ({
  className,
  width = 600,
  index,
  ...svgProps
}: {
  className?: string
  width?: number
  index: number
} & React.ComponentProps<typeof motion.svg>) => {
  const { resolvedTheme } = useTheme()
  const id = useId()

  // Vary animation parameters based on index for more organic movement
  const duration = 2 + (index % 3) * 0.5 // Varies between 2-3.5s
  const delay = (index % 4) * 0.3 // Staggered delays
  const beamLength = 40

  return (
    <motion.svg
      width={width ?? '600'}
      height='2'
      viewBox={`0 0 ${width ?? '600'} 2`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('absolute inset-x-0 w-full', className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 1H${width ?? '600'}`}
        stroke={`url(#svgGradient-${id})`}
        strokeWidth='2'
        strokeLinecap='round'
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          gradientUnits='userSpaceOnUse'
          initial={{
            x1: -beamLength,
            x2: 0,
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: [-beamLength, width + beamLength],
            x2: [0, width + beamLength * 2],
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: duration,
            delay: delay,
            ease: [0.4, 0.0, 0.2, 1], // Custom easing for smoother movement
            repeat: Infinity,
            repeatDelay: 0.5 + (index % 3) * 0.3, // Pause between cycles
          }}
        >
          <stop
            offset='0%'
            stopColor={resolvedTheme === 'light' ? '#000' : '#ffffff'}
            stopOpacity='0'
          />
          <stop
            offset='10%'
            stopColor={resolvedTheme === 'light' ? '#000' : '#ffffff'}
            stopOpacity='0.3'
          />
          <stop
            offset='50%'
            stopColor={resolvedTheme === 'light' ? '#000' : '#ffffff'}
            stopOpacity='1'
          />
          <stop
            offset='90%'
            stopColor={resolvedTheme === 'light' ? '#000' : '#ffffff'}
            stopOpacity='0.3'
          />
          <stop
            offset='100%'
            stopColor={resolvedTheme === 'light' ? '#000' : '#ffffff'}
            stopOpacity='0'
          />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  )
}

export default Beam
