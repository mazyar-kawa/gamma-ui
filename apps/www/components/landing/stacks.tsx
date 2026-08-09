"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

const imageLoader = ({ src }: { src: string }) => {
  return `https://cdn.simpleicons.org/${src}`
}

interface StacksProps {
  variant?: "grid" | "row"
  className?: string
}

export function Stacks({ variant = "grid", className }: StacksProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const techStack = [
    { name: "React", icon: "react", isImage: false },
    {
      name: "Next.js",
      icon: `next.js/${mounted && theme === "dark" ? "white" : "black"}`,
      isImage: false,
    },
    { name: "Motion", icon: "/motion.svg", isImage: true },
    { name: "Tailwind", icon: "tailwindcss", isImage: false },
    {
      name: "shadcn/ui",
      icon: `shadcnui/${mounted && theme === "dark" ? "white" : "black"}`,
      isImage: false,
    },
  ]

  if (variant === "row") {
    return (
      <div
        className={cn(
          "border-border/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border px-4 py-3 sm:gap-x-8",
          className
        )}
      >
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="text-muted-foreground flex items-center gap-2 text-xs font-medium sm:text-sm"
          >
            <Image
              alt=""
              height={16}
              width={16}
              {...(tech.isImage
                ? { src: tech.icon }
                : { loader: imageLoader, src: tech.icon })}
              className="size-4 opacity-80"
            />
            {tech.name}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("my-4", className)}>
      <div className="mx-auto grid grid-cols-3 items-center gap-6 py-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="text-muted-foreground flex flex-col items-center gap-2"
          >
            <Image
              alt={tech.name}
              height={15}
              width={15}
              {...(tech.isImage
                ? { src: tech.icon }
                : { loader: imageLoader, src: tech.icon })}
              className="size-7"
            />
            <span className="text-center text-xs whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
