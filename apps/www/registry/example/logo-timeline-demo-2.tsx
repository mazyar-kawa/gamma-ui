import {
  IconBrandApple,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogleDrive,
  IconBrandMessenger,
  IconBrandNotion,
  IconBrandOpenai,
  IconBrandPaypal,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react"

import { LogoTimeline } from "@/registry/gammaui/logo-timeline"
import type { LogoItem } from "@/registry/gammaui/logo-timeline"

const logos: LogoItem[] = [
  // Row 1 - Communication & Social (2 logos, 50s duration, spaced 25s apart)
  {
    label: "Discord",
    icon: <IconBrandDiscord />,
    animationDelay: -50,
    animationDuration: 50,
    row: 1,
  },
  {
    label: "X (Twitter)",
    icon: <IconBrandX />,
    animationDelay: -25,
    animationDuration: 50,
    row: 1,
  },
  // Row 2 - Development Tools (2 logos, 45s duration, spaced 22.5s apart)
  {
    label: "GitHub",
    icon: <IconBrandGithub />,
    animationDelay: -45,
    animationDuration: 45,
    row: 2,
  },
  {
    label: "React",
    icon: <IconBrandReact />,
    animationDelay: -22.5,
    animationDuration: 45,
    row: 2,
  },
  // Row 3 - Development Tools Continued (3 logos, 60s duration, spaced 20s apart)
  {
    label: "TypeScript",
    icon: <IconBrandTypescript />,
    animationDelay: -60,
    animationDuration: 60,
    row: 3,
  },
  {
    label: "Tailwind",
    icon: <IconBrandTailwind />,
    animationDelay: -40,
    animationDuration: 60,
    row: 3,
  },

  // Row 4 - Productivity & Cloud (2 logos, 55s duration, spaced 27.5s apart)
  {
    label: "Google Drive",
    icon: <IconBrandGoogleDrive />,
    animationDelay: -55,
    animationDuration: 55,
    row: 4,
  },
  {
    label: "Notion",
    icon: <IconBrandNotion />,
    animationDelay: -27.5,
    animationDuration: 55,
    row: 4,
  },
  // Row 5 - Messaging (2 logos, 50s duration, spaced 25s apart)
  {
    label: "WhatsApp",
    icon: <IconBrandWhatsapp />,
    animationDelay: -50,
    animationDuration: 50,
    row: 5,
  },
  {
    label: "Messenger",
    icon: <IconBrandMessenger />, // Placeholder icon
    animationDelay: -25,
    animationDuration: 50,
    row: 5,
  },
  // Row 6 - AI & Automation (3 logos, 65s duration, spaced ~21.5s apart)
  {
    label: "OpenAI",
    icon: <IconBrandOpenai />, // Placeholder icon
    animationDelay: -65,
    animationDuration: 65,
    row: 6,
  },

  // Row 7 - Payment & Services (2 logos, 50s duration, spaced 25s apart)
  {
    label: "PayPal",
    icon: <IconBrandPaypal />, // Placeholder icon
    animationDelay: -50,
    animationDuration: 50,
    row: 7,
  },
  {
    label: "Apple",
    icon: <IconBrandApple />, // Placeholder icon
    animationDelay: -25,
    animationDuration: 50,
    row: 7,
  },
]

export default function LogoTimelineDemo() {
  return (
    <div className="w-full overflow-hidden">
      <LogoTimeline
        items={logos}
        height="h-[400px] sm:h-[400px]"
        iconSize={18}
        showRowSeparator={true}
        animateOnHover={true}
      />
    </div>
  )
}
