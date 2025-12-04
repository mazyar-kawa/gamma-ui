"use client"

import { useTheme } from "next-themes"

import { MacBookKeyboard } from "@/registry/gammaui/macbook-keyboard"

export const MacbookKeyboardDemo = () => {
  const { resolvedTheme } = useTheme()
  return (
    <div className="mx-4 w-full rounded-[3px] bg-[#0C0C0F]">
      <MacBookKeyboard glowColor={resolvedTheme === "dark" ? "#FFF" : "#000"} />
    </div>
  )
}
