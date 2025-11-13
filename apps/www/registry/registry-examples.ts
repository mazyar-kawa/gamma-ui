import { type Registry } from "@/schema"

export const examples: Registry["items"] = [


   {
    name: "live-waveform-demo",
    type: "registry:example",
    title: "Live Waveform Demo",
    description: "A customizable live audio waveform visualizer using the Web Audio API.",
    registryDependencies: ["@gammaui/live-waveform"],
    files: [
      {
        path: "example/live-waveform-demo.tsx",
        type: "registry:example",
      },
    ],
  },

  {
  name: "support-box-demo",
  type: "registry:example",
  title: "Support Box Demo",
  description: "An expandable and animated support widget with quick help actions using Framer Motion.",
  registryDependencies: ["@gammaui/support-box"],
  files: [
    {
      path: "example/support-box-demo.tsx",
      type: "registry:example",
    },
  ],
},
{
  name: "overlay-button-demo",
  type: "registry:example",
  title: "Overlay Button Demo",
  description: "A looping animated gradient button using Framer Motion’s spring transitions for smooth motion effects.",
  registryDependencies: ["@gammaui/overlay-button"],
  files: [
    {
      path: "example/overlay-button-demo.tsx",
      type: "registry:example",
    },
  ],
},
{
  name: "border-button-demo",
  type: "registry:example",
  title: "Border Button Demo",
  description: "An interactive button that animates its border dynamically based on cursor position using Framer Motion.",
  registryDependencies: ["@gammaui/border-button"],
  files: [
    {
      path: "example/border-button-demo.tsx",
      type: "registry:example",
    },
  ],
},
{
  name: "wavy-text-block-demo",
  type: "registry:example",
  title: "Wavy Text Block Demo",
  description: "An example demonstrating the Wavy Block scroll-triggered animation with multiple text lines.",
  registryDependencies: ["@gammaui/wavy-text-block"],
  files: [
    {
      path: "example/wavy-text-block-demo.tsx",
      type: "registry:example"
    }
  ]
},
{
  name: "inverted-cursor-demo",
  type: "registry:example",
  title: "Inverted Cursor Demo",
  description: "A smooth, animated custom cursor component with blend mode effects.",
  registryDependencies: ["@gammaui/inverted-cursor"],
  files: [
    {
      path: "example/inverted-cursor-demo.tsx",
      type: "registry:example"
    }
  ]
},

{
  name: "pixel-button-demo",
  type: "registry:example",
  title: "Pixel Button Demo",
  description: "A pixelated button animation effect built with Tailwind CSS and React.",
  registryDependencies: ["@gammaui/pixel-button"],
  files: [
    {
      path: "example/pixel-button-demo.tsx",
      type: "registry:example"
    }
  ]
},
{
  name: "plasma-demo",
  type: "registry:example",
  title: "Plasma Demo",
  description: "A mesmerizing plasma shader animation rendered with WebGL, perfect for dynamic backgrounds and previews.",
  registryDependencies: ["@gammaui/plasma"],
  files: [
    {
      path: "example/plasma-demo.tsx",
      type: "registry:example"
    }
  ]
},


  
]