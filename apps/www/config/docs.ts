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
          title: "Rest API",
          href: `/docs/components/rest-api`,
          items: [],
          label: "New",
        },
        {
          title: "Macbook Keyboard",
          href: `/docs/components/macbook-keyboard`,
          items: [],
          label: "New",
        },
        {
          title: "CPU Architecture",
          href: `/docs/components/cpu-architecture`,
          items: [],
          label: "New",
        },
        {
          title: "Shadcn UI",
          href: `/docs/components/shadcn-ui`,
          items: [],
          label: "New",
        },
        {
          title: "Location Map",
          href: `/docs/components/location-map`,
          items: [],
          label: "New",
        },
        {
          title: "3D Folder",
          href: `/docs/components/3d-folder`,
          items: [],
          label: "New",
        },
        {
          title: "Live Waveform",
          href: `/docs/components/live-waveform`,
          items: [],
          label: "New",
        },
        {
          title: "Radial Intro",
          href: `/docs/components/radial-intro`,
          items: [],
          label: "New",
        },
        {
          title: "Animated List",
          href: `/docs/components/animated-list`,
          items: [],
          label: "New",
        },
        {
          title: "Text Roll",
          href: `/docs/components/text-roll`,
          items: [],
          label: "New",
        },
        {
          title: "Logo Timeline",
          href: `/docs/components/logo-timeline`,
          items: [],
          label: "New",
        },
        {
          title: "Pricing Interaction",
          href: `/docs/components/pricing-interaction`,
          items: [],
          label: "New",
        },
        {
          title: "Activity Dropdown",
          href: `/docs/components/activity-dropdown`,
          items: [],
          label: "New",
        },
        {
          title: "Badge",
          href: `/docs/components/badge`,
          items: [],
          label: "New",
        },
        {
          title: "Logo Cloud",
          href: `/docs/components/logo-cloud`,
          items: [],
          label: "New",
        },
        {
          title: "Wave Path",
          href: `/docs/components/wave-path`,
          items: [],
          label: "New",
        },

        {
          title: "Support Box",
          href: `/docs/components/support-box`,
          items: [],
          label: "New",
        },
        {
          title: "Inverted Cursor",
          href: `/docs/components/inverted-cursor`,
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
          label: "New",
        },
        {
          title: "Border Button",
          href: `/docs/components/border-button`,
          items: [],
          label: "New",
        },

        {
          title: "Pixel Button",
          href: `/docs/components/pixel-button`,
          items: [],
          label: "New",
        },
        {
          title: "Magnetize Button",
          href: `/docs/components/magnetize-button`,
          items: [],
          label: "New",
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
          label: "New",
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
