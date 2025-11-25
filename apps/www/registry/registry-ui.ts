import { type Registry } from "@/schema"

export const ui: Registry["items"] = [
  {
    name: "live-waveform",
    type: "registry:ui",
    title: "Live Waveform",
    description:
      "A customizable live audio waveform visualizer using the Web Audio API.",
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
    registryDependencies: ["@gammaui/inverted-cursor"],
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
    registryDependencies: ["@gammaui/pixel-button"],
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
    registryDependencies: ["@gammaui/plasma"],
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
    registryDependencies: ["@gammaui/radial-intro"],
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
    registryDependencies: ["@gammaui/logo-cloud"],
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
    registryDependencies: ["@gammaui/wave-path"],
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
    registryDependencies: ["@gammaui/magnetize-button"],
    files: [
      {
        path: "gammaui/magnetize-button.tsx",
        type: "registry:ui",
      },
    ],
  },
]
