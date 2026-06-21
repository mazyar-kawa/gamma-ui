import { NavItem, NavItemWithChildren } from "@/types/index"

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Components",
      href: "/components",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          items: [],
        },
        {
          title: "Install Next.js",
          href: "/docs/nextjs-installation",
          items: [],
        },
      ],
    },

    {
      title: "Components",
      items: [
        {
          title: "Cloud Flow",
          href: `/docs/components/cloud-flow`,
          items: [],
        },
        {
          title: "Macbook Keyboard",
          href: `/docs/components/macbook-keyboard`,
          items: [],
        },
        {
          title: "CPU Architecture",
          href: `/docs/components/cpu-architecture`,
          items: [],
        },
        {
          title: "Shadcn UI",
          href: `/docs/components/shadcn-ui`,
          items: [],
        },
        {
          title: "Location Map",
          href: `/docs/components/location-map`,
          items: [],
        },
        {
          title: "3D Folder",
          href: `/docs/components/3d-folder`,
          items: [],
        },
        {
          title: "Live Waveform",
          href: `/docs/components/live-waveform`,
          items: [],
        },
        {
          title: "Radial Intro",
          href: `/docs/components/radial-intro`,
          items: [],
        },
        {
          title: "Animated List",
          href: `/docs/components/animated-list`,
          items: [],
        },
        {
          title: "Text Roll",
          href: `/docs/components/text-roll`,
          items: [],
        },
        {
          title: "Logo Timeline",
          href: `/docs/components/logo-timeline`,
          items: [],
        },
        {
          title: "Pricing Interaction",
          href: `/docs/components/pricing-interaction`,
          items: [],
        },
        {
          title: "Activity Dropdown",
          href: `/docs/components/activity-dropdown`,
          items: [],
        },
        {
          title: "Badge",
          href: `/docs/components/badge`,
          items: [],
        },
        {
          title: "Logo Cloud",
          href: `/docs/components/logo-cloud`,
          items: [],
        },
        {
          title: "Wave Path",
          href: `/docs/components/wave-path`,
          items: [],
        },

        {
          title: "Support Box",
          href: `/docs/components/support-box`,
          items: [],
        },
        {
          title: "Inverted Cursor",
          href: `/docs/components/inverted-cursor`,
          items: [],
        },
        {
          title: "Usage Card",
          href: `/docs/components/usage-card`,
          items: [],
          label: "New",
        },
        {
          title: "Data Feeding In",
          href: `/docs/components/data-feeding-in`,
          items: [],
          label: "New",
        },
      ],
    },

    {
      title: "Buttons",
      items: [
        {
          title: "Overlay Button",
          href: `/docs/components/overlay-button`,
          items: [],
        },
        {
          title: "Border Button",
          href: `/docs/components/border-button`,
          items: [],
        },

        {
          title: "Pixel Button",
          href: `/docs/components/pixel-button`,
          items: [],
        },
        {
          title: "Magnetize Button",
          href: `/docs/components/magnetize-button`,
          items: [],
        },
      ],
    },

    {
      title: "Text Animations",
      items: [
        {
          title: "Wavy Text Block",
          href: `/docs/components/wavy-text-block`,
          items: [],
        },
      ],
    },

    {
      title: "Backgrounds",
      items: [
        {
          title: "Plasma",
          href: `/docs/components/plasma`,
          items: [],
        },
        {
          title: "Aurora Glass",
          href: `/docs/components/aurora-glass`,
          items: [],
          label: "New",
        },
      ],
    },
  ],
}

export const introItems = [
  {
    name: "Introduction",
    href: "/docs/introduction",
  },
  {
    name: "Install Next.js",
    href: "/docs/install-nextjs",
  },
  {
    name: "Install Tailwind CSS",
    href: "/docs/install-tailwindcss",
  },
]
