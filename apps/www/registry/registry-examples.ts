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
}

  
]