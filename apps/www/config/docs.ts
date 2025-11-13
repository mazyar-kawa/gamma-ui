import { NavItem, NavItemWithChildren } from '@/types/index'

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Components',
      href: '/components',
    },
    {
      title: 'Templates',
      href: 'https://pro.gammaui.design',
      event: 'header_cta_clicked',
      label: '',
    },
    {
      title: 'Showcase',
      href: '/showcase',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
          items: [],
        },
        {
          title: 'Install Next.js',
          href: '/docs/nextjs-installation',
          items: [],
        },
      ],
    },
    
    {
      title: 'Components',
      items: [
        {
          title: 'Live Waveform',
          href: `/docs/components/live-waveform`,
          items: [],
        },
         {
          title: 'Support Box',
          href: `/docs/components/support-box`,
          items: [],
        },
         {
          title: 'Inverted Cursor',
          href: `/docs/components/inverted-cursor`,
          items: [],
        },
      ],
    },

    {
      title: 'Buttons',
      items: [
        {
          title: 'Overlay Button',
          href: `/docs/components/overlay-button`,
          items: [],
        },
         {
          title: 'Border Button',
          href: `/docs/components/border-button`,
          items: [],
        },

         {
          title: 'Pixel Button',
          href: `/docs/components/pixel-button`,
          items: [],
        },
      ],
    },

    {
      title: 'Text Animations',
      items: [
        {
          title: 'Wavy Text Block',
          href: `/docs/components/wavy-text-block`,
          items: [],
        },
       
      ],
    },
  ],
}

export const introItems = [
  {
    name: 'Introduction',
    href: '/docs/introduction',
  },
  {
    name: 'Install Next.js',
    href: '/docs/install-nextjs',
  },
  {
    name: 'Install Tailwind CSS',
    href: '/docs/install-tailwindcss',
  },
]
