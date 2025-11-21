"use client"

import * as React from "react"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 px-0"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      <IconSun
        className="scale-100 rotate-0 text-black transition-all hover:scale-110 dark:scale-0 dark:-rotate-90"
        size={20}
      />
      <IconMoon
        className="absolute scale-0 rotate-90 text-white transition-all hover:scale-110 dark:scale-100 dark:rotate-0"
        size={20}
      />
    </Button>
  )
}
