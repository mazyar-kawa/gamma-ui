import { type Registry } from "@/schema"

export const ui: Registry["items"] = [
  {
    name: "live-waveform",
    type: "registry:ui",
    title: "Live Waveform",
    description:
      "A customizable live audio waveform visualizer using the Web Audio API.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/live-waveform.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "support-box",
    type: "registry:ui",
    title: "Support Box",
    description:
      "A collapsible animated support widget for quick help actions using Framer Motion.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/support-box.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "overlay-button",
    type: "registry:ui",
    title: "Overlay Button",
    description:
      "An animated gradient button using Framer Motion with looping motion and spring transitions.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/overlay-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "border-button",
    type: "registry:ui",
    title: "Border Button",
    description:
      "A reactive border animation button that follows cursor movement using Framer Motion and CSS masks.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/border-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "wavy-text-block",
    type: "registry:ui",
    title: "Wavy Text Block",
    description:
      "A scroll-triggered wavy text animation component that creates flowing motion effects using Framer Motion and scroll context.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/wavy-text-block.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "inverted-cursor",
    type: "registry:ui",
    title: "Inverted Cursor",
    description:
      "A smooth, animated custom cursor component with blend mode effects.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/inverted-cursor.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "pixel-button",
    type: "registry:ui",
    title: "Pixel Button",
    description:
      "A pixelated button animation effect built with Tailwind CSS and React.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/pixel-button.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "plasma",
    type: "registry:ui",
    title: "Plasma",
    description:
      "A mesmerizing plasma shader animation rendered with WebGL, perfect for dynamic backgrounds and previews.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/plasma.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "radial-intro",
    type: "registry:ui",
    title: "Radial Intro",
    description:
      "A dynamic radial orbit animation built with Motion and React, featuring upright spinning image nodes.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/radial-intro.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "logo-cloud",
    type: "registry:ui",
    title: "Logo Cloud",
    description:
      "A responsive logo grid component supporting dark mode, decorations, and flexible layout.",
    dependencies: ["react", "@tabler/icons-react"],
    files: [
      {
        path: "gammaui/logo-cloud.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "wave-path",
    type: "registry:ui",
    title: "Wave Path",
    description:
      "A dynamic interactive SVG wave component that responds to pointer movement.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/wave-path.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "magnetize-button",
    type: "registry:ui",
    title: "Magnetize Button",
    description:
      "A magnetic particle-attraction button built with Framer Motion.",
    dependencies: ["react", "motion", "@tabler/icons-react"],
    files: [
      {
        path: "gammaui/magnetize-button.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "text-roll",
    type: "registry:ui",
    title: "Text Roll",
    description:
      "A rolling hover-animated text component built with Motion One.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/text-roll.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "activity-dropdown",
    type: "registry:ui",
    title: "Activity Dropdown",
    description:
      "A modern activity/notification dropdown with smooth animations and responsive motion.",
    dependencies: ["react", "@tabler/icons-react"],
    files: [
      {
        path: "gammaui/activity-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description:
      "A flexible and customizable Badge component for labels, statuses, and indicators.",
    dependencies: ["react", "@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        path: "gammaui/badge.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "animated-list",
    type: "registry:ui",
    title: "Animated List",
    description:
      "A dynamic list component with smooth animations that forms a column and scrolls through items continuously.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/animated-list.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "logo-timeline",
    type: "registry:ui",
    title: "Logo Timeline",
    description:
      "A multi-row infinitely scrolling logo timeline built with Motion One, supporting hover-activated animations and row grouping.",
    dependencies: ["react", "motion"],
    files: [
      {
        path: "gammaui/logo-timeline.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "logo-loop",
    type: "registry:ui",
    title: "Logo Timeline",
    description:
      "A looping logo marquee component with horizontal and vertical motion, hover effects, fading edges, and responsive behavior.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/logo-loop.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "pricing-interaction",
    type: "registry:ui",
    title: "Pricing Interaction",
    description:
      "An interactive pricing switcher with animated numbers, selectable plans, and monthly/yearly billing modes.",
    dependencies: ["react", "@number-flow/react"],
    files: [
      {
        path: "gammaui/pricing-interaction.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "rest-api",
    type: "registry:ui",
    title: "Rest API",
    description:
      "A beautifully animated REST API visualization component with SVG paths, glowing lights, badges, and interactive motion effects.",
    dependencies: ["react", "@tabler/icons-react", "motion"],
    files: [
      {
        path: "gammaui/rest-api.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "macbook-keyboard",
    type: "registry:ui",
    title: "Macbook Keyboard",
    description: "Interactive animated MacBook keyboard component.",
    dependencies: ["react", "@tabler/icons-react", "motion"],
    files: [
      {
        path: "gammaui/macbook-keyboard.tsx",
        type: "registry:ui",
      },
    ],
  },

  {
    name: "cpu-architecture",
    type: "registry:ui",
    title: "CPU Architecture",
    description:
      "A fully animated CPU architecture SVG component with dynamic paths, gradients, and optional CPU connections.",
    dependencies: ["react"],
    files: [
      {
        path: "gammaui/cpu-architecture.tsx",
        type: "registry:ui",
      },
    ],
  },
]
