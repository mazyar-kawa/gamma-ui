import Link from "next/link"
import { IconBrandX } from "@tabler/icons-react"

import { siteConfig } from "@/config/sits"
import { cn } from "@/lib/utils"

export function TwitterLink() {
  return (
    <Link
      href={`${siteConfig.links.twitter}`}
      target="_blank"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-transparent text-black dark:text-white"
      )}
    >
      <IconBrandX className="h-[18px] w-[18px]" />
    </Link>
  )
}
