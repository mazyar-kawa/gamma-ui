"use client"

import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionProps {
  step?: number
  title?: string
  children?: ReactNode
}

export function Dependencies({ step, title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-background absolute flex h-9 w-9 items-center justify-center rounded-full border-[3px] bg-neutral-300 select-none dark:bg-neutral-800">
        <span className="font-semibold text-black dark:text-white">{step}</span>
      </div>
      <div
        className={cn(
          "ml-[1.1rem]",
          children && "border-l border-neutral-200 dark:border-neutral-900"
        )}
      >
        <div className="space-y-4 pt-1 pb-8 pl-8">
          <h2 className="font-medium text-black/90 dark:text-white/90">
            {title}
          </h2>
          <span className="pl-7">{children}</span>
        </div>
      </div>
    </div>
  )
}

export default Dependencies
