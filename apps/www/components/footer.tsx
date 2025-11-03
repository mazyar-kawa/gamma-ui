import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: ReactNode
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  showModeToggle?: boolean
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-background w-full h-20 p-4 max-w-7xl mx-auto flex items-center justify-center text-sm border-t overflow-hidden',
        className
      )}
    >
      {/* Content */}
      <div className='relative z-10'>
        <p className='text-center text-muted-foreground'>
          Engineered by{' '}
          <Link
            href='https://www.linkedin.com/in/mazyar-kawa-b0aa3921b/'
            className='underline hover:text-foreground transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mazyar
          </Link>
          . The source code is available on{' '}
          <Link
            href='https://github.com/yourusername/yourrepo'
            className='underline hover:text-foreground transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
