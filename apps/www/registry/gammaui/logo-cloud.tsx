import { IconPlus } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<"div">

export default function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t" />

      <LogoCard
        className="relative border-r border-b bg-gray-100 dark:bg-[#121212]"
        logo={{
          src: "https://svgl.app/library/nvidia-wordmark-light.svg",
          alt: "Nvidia Logo",
        }}
      >
        <IconPlus
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-white md:border-r dark:bg-black"
        logo={{
          src: "https://svgl.app/library/supabase_wordmark_light.svg",
          alt: "Supabase Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-gray-100 md:bg-gray-100 dark:bg-[#121212] md:dark:bg-[#121212]"
        logo={{
          src: "https://svgl.app/library/github_wordmark_light.svg",
          alt: "GitHub Logo",
        }}
      >
        <IconPlus
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6"
          strokeWidth={1}
        />
        <IconPlus
          className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-gray-100 md:bg-white dark:bg-[#121212] md:dark:bg-black"
        logo={{
          src: "https://svgl.app/library/openai_wordmark_light.svg",
          alt: "OpenAI Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-gray-100 md:border-b-0 md:bg-white dark:bg-[#121212] md:dark:bg-black"
        logo={{
          src: "https://svgl.app/library/turso-wordmark-light.svg",
          alt: "Turso Logo",
        }}
      >
        <IconPlus
          className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 md:-left-[12.5px] md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-white md:border-r md:border-b-0 md:bg-gray-100 dark:bg-black md:dark:bg-[#121212]"
        logo={{
          src: "https://svgl.app/library/clerk-wordmark-light.svg",
          alt: "Clerk Logo",
        }}
      />

      <LogoCard
        className="border-r bg-white dark:bg-black"
        logo={{
          src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
          alt: "Claude AI Logo",
        }}
      />

      <LogoCard
        className="bg-gray-100 dark:bg-[#121212]"
        logo={{
          src: "https://svgl.app/library/vercel_wordmark.svg",
          alt: "Vercel Logo",
        }}
      />

      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b" />
    </div>
  )
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo
}

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "bg-background flex items-center justify-center px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
      />
      {children}
    </div>
  )
}
