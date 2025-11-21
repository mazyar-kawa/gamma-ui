"use client"

import { useEffect, useState } from "react"

import { highlightCode } from "@/lib/highlight-code"

import { CopyButton } from "./copy-button"
import { getIconForLanguageExtension } from "./icons"

function ComponentCode({
  code,
  language,
  title,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
  const [highlighted, setHighlighted] = useState<string>("")

  const isDark =
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark")
      highlightCode(code, language, dark ? "github-dark" : "github-light").then(
        setHighlighted
      )
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Initial render
    highlightCode(code, language, isDark ? "github-dark" : "github-light").then(
      setHighlighted
    )

    return () => observer.disconnect()
  }, [code, language, isDark])

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="rounded-lg bg-white px-2 py-4 dark:bg-[#24292E] [&>pre]:max-h-96"
    >
      <div
        className={`flex items-center ${title ? "justify-between" : "justify-end"}`}
      >
        {title && (
          <figcaption
            data-rehype-pretty-code-title=""
            className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
            data-language={language}
          >
            {getIconForLanguageExtension(language)}
            {title}
          </figcaption>
        )}
        <CopyButton value={code} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlighted }} />
    </figure>
  )
}

export default ComponentCode
