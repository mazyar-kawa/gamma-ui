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
}
 
]