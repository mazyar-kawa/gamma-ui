import Image from "next/image"
import Link from "next/link"

import { SHOWCASE_TYPE_LABELS, type ShowcaseProject } from "@/config/showcase"
import { cn } from "@/lib/utils"

interface ShowcaseCardProps {
  project: ShowcaseProject
  className?: string
}

export function ShowcaseCard({ project, className }: ShowcaseCardProps) {
  const typeLabel = SHOWCASE_TYPE_LABELS[project.type]

  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "border-border/70 bg-card group w-[min(100%,300px)] shrink-0 overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[320px]",
        className
      )}
    >
      <div className="bg-muted relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="text-foreground min-w-0 truncate font-semibold">
          {project.name}
        </p>
        <span className="border-border/70 bg-muted/60 text-muted-foreground shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
          {typeLabel}
        </span>
      </div>
    </Link>
  )
}
