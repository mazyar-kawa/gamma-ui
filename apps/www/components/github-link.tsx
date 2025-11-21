import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"

import { siteConfig } from "@/config/sits"
import { cn } from "@/lib/utils"

export function GithubLink() {
  return (
    <Link
      href={`${siteConfig.links.github}`}
      target="_blank"
      className={cn(
        "flex h-8 w-18 items-center justify-center gap-1 rounded-sm bg-transparent text-black dark:text-white"
      )}
    >
      <IconBrandGithub className="h-[18px] w-[18px]" />
      <p className="text-sm">19,200</p>
    </Link>
  )
}
