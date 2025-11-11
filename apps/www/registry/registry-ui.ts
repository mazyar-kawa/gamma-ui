import { type Registry } from "@/schema"

export const ui: Registry["items"] = [
  
  {
  name: "live-waveform",
  type: "registry:ui",
  title: "Live Waveform",
  description: "A customizable live audio waveform visualizer using the Web Audio API.",
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
  description: "A collapsible animated support widget for quick help actions using Framer Motion.",
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
  description: "An animated gradient button using Framer Motion with looping motion and spring transitions.",
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
  description: "A reactive border animation button that follows cursor movement using Framer Motion and CSS masks.",
  files: [
    {
      path: "gammaui/border-button.tsx",
      type: "registry:ui",
    },
  ],
}
 
]