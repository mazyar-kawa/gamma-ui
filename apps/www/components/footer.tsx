import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: ReactNode
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  showModeToggle?: boolean
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-background container mx-auto flex h-20 w-full items-center justify-center overflow-hidden border-t p-4 text-sm",
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10">
        <p className="text-muted-foreground text-center">
          Engineered by{" "}
          <Link
            href="https://www.linkedin.com/in/mazyar-kawa-b0aa3921b/"
            className="hover:text-foreground underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mazyar
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/yourusername/yourrepo"
            className="hover:text-foreground underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
