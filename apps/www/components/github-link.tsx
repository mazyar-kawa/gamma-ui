"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"

import { siteConfig } from "@/config/sits"
import { cn } from "@/lib/utils"

export function GithubLink() {
  const [stars, setStars] = useState<number | null>(1)
  useEffect(() => {
    fetch("https://api.github.com/repos/mazyar-kawa/gamma-ui")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((error) => console.error("Error fetching GitHub stars:", error))
  }, [])
  return (
    <Link
      href={`${siteConfig.links.github}`}
      target="_blank"
      className={cn(
        "flex h-8 w-20 items-center justify-center gap-3 rounded-sm border border-gray-200 bg-transparent px-2 text-black hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800",
        "transition-colors duration-200 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-neutral-600"
      )}
    >
      <IconBrandGithub className="h-[18px] w-[18px]" />
      <p className="text-sm">
        <span className="z-0 w-8 text-xs tabular-nums">
          <span className="hidden sm:inline">{stars?.toLocaleString()}</span>
          <span className="sm:hidden">
            {stars && stars >= 1000
              ? `${(stars / 1000).toFixed(1)}k`
              : stars?.toLocaleString()}
          </span>
        </span>
      </p>
    </Link>
  )
}
