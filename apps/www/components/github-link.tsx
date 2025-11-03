import { siteConfig } from '@/config/sits'
import { cn } from '@/lib/utils'
import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export function GithubLink() {
  return (
    <Link
      href={`${siteConfig.links.github}`}
      target='_blank'
      className={cn(
        'flex gap-1 h-8 w-18 items-center justify-center rounded-sm bg-transparent text-black dark:text-white'
      )}
    >
      <IconBrandGithub className='h-[18px] w-[18px]' />
      <p className='text-sm'>19,200</p>
    </Link>
  )
}
