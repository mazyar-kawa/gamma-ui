import { IconChevronRight } from '@tabler/icons-react'
import { Button } from '../ui/button'
import { AnimatedGridBackground } from './animated-grid-background'
import { Stacks } from './stacks'

const Hero = () => {
  return (
    <div className='relative bg-white dark:bg-black transition-colors duration-300'>
      <AnimatedGridBackground>
        <div className='relative flex flex-col w-full h-[calc(100vh-2rem)] justify-center items-center sm:py-20 max-w-7xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-linear-to-br from-gray-900 to-gray-700 dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30 bg-clip-text text-transparent max-w-2xl'>
            The UI Library Developers Deserve
          </h1>
          <p className='my-6 max-w-sm text-balance bg-linear-to-br from-black/70 via-black/70 to-black/30 dark:from-white/70 dark:via-white/70 dark:to-white/30 bg-clip-text text-center text-[0.87rem] text-transparent sm:max-w-3xl md:text-[1.15rem]'>
            150+ React.js components powered by{' '}
            <span className='font-semibold'>Tailwind CSS</span> and{' '}
            <span className='font-semibold'>Motion</span>. Fully open-source,
            production-ready.
            <br /> Perfect companion for
            <span className='font-semibold'> shadcn/ui</span>.
          </p>
          <div className='flex gap-8'>
            <Button className='capitalize flex items-center gap-2' size={'lg'}>
              browse components
              <IconChevronRight className='h-4 w-4' />
            </Button>
            <a
              className='group flex items-center gap-1.5 text-[0.75rem] text-black dark:text-white md:gap-2 md:text-[1rem]'
              href='/docs/introduction'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-book-open h-3.5 w-3.5 translate-y-px md:h-4 md:w-4'
              >
                <path d='M12 7v14'></path>
                <path d='M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'></path>
              </svg>
              Documentation
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-chevron-right mt-0.5 h-3.5 w-3.5 transition-all duration-200 ease-in-out group-hover:translate-x-2 md:h-4 md:w-4 md:group-hover:translate-x-3'
              >
                <path d='m9 18 6-6-6-6'></path>
              </svg>
            </a>
          </div>
          <Stacks />
        </div>
      </AnimatedGridBackground>
      {/* Content */}
    </div>
  )
}

export default Hero
