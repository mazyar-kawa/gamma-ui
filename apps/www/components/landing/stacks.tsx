"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

const imageLoader = ({ src }: { src: string }) => {
  return `https://cdn.simpleicons.org/${src}`
}

export function Stacks() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
  }, [])

  const techStack = [
    {
      id: 1,
      name: "React",
      icon: "react",
      category: "frontend",
      color: "cyan",
    },
    {
      id: 2,
      name: "Next.js",
      icon: `next.js/${mounted && theme === "dark" ? "white" : "black"}`,
      category: "frontend",
      color: "white",
    },
    {
      id: 3,
      name: "Motion",
      icon: "/motion.svg",
      category: "frontend",
      color: "yellow",
      isImage: true,
    },
    {
      id: 4,
      name: "Tailwind CSS",
      icon: "tailwindcss",
      category: "frontend",
      color: "cyan",
    },
    {
      id: 5,
      name: "shadcn/ui",
      icon: `shadcnui/${mounted && theme === "dark" ? "white" : "black"}`,
      category: "frontend",
      color: "white",
    },
  ]

  return (
    <div className="my-4">
      <div className="z-10 mx-auto flex w-full max-w-full flex-col items-center justify-center">
        <div className="mx-auto grid grid-cols-3 items-center justify-between gap-6 py-4 sm:flex sm:flex-wrap sm:gap-8">
          {techStack?.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-2 text-black dark:text-white"
            >
              <Image
                alt={tech.name}
                height={15}
                width={15}
                {...(tech.isImage
                  ? { src: tech.icon }
                  : { loader: imageLoader, src: tech.icon })}
                className="mx-auto size-7"
              />
              <span className="mt-1 text-center text-xs whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
