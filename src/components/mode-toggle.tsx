'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { IconMoon, IconSun } from '@tabler/icons-react'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button
      variant='ghost'
      size='icon'
      className='w-9 px-0'
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
    >
      <IconSun
        className='rotate-0 scale-100 transition-all hover:scale-110 dark:-rotate-90 dark:scale-0 text-black'
        size={20}
      />
      <IconMoon
        className='absolute rotate-90 scale-0 transition-all hover:scale-110 dark:rotate-0 dark:scale-100 text-white'
        size={20}
      />
    </Button>
  )
}
