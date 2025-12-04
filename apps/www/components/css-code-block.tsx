"use client"

import * as React from "react"
import { ChevronDown, CodeIcon } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

interface CSSCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string
  code: string
  copyCode?: boolean
  contentClassName?: string
  collapsible?: boolean
  defaultExpanded?: boolean
  showPreview?: boolean
  previewContent?: React.ReactNode
}

export function CSSCodeBlock({
  fileName = "styles.css",
  className,
  contentClassName,
  code,
  copyCode = true,
  collapsible = false,
  defaultExpanded = true,
  showPreview = false,
  previewContent,
  ...props
}: CSSCodeBlockProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  if (!code) {
    return (
      <p className="text-muted-foreground text-sm">
        CSS code{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {fileName}
        </code>{" "}
        not found.
      </p>
    )
  }

  const CodeContent = () => (
    <div
      className={cn(
        "relative my-10 rounded-xl border border-neutral-300/50 bg-neutral-200/30 dark:border-neutral-800/60 dark:bg-neutral-900/40",
        className
      )}
      {...props}
    >
      {fileName && (
        <div className="relative flex h-10 items-center justify-between border-b border-neutral-300/50 bg-neutral-200/30 pr-2.5 pl-4 dark:border-neutral-800/60 dark:bg-neutral-900/30">
          <div className="flex items-center gap-2">
            <CodeIcon
              size={14}
              className="text-neutral-500 dark:text-neutral-600"
            />
            <span className="text-[13px] leading-none font-medium text-neutral-500">
              {fileName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {copyCode && <CopyButton value={code} />}
            {collapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                  )}
                />
              </button>
            )}
          </div>
        </div>
      )}
      {(!collapsible || isExpanded) && (
        <div
          className={cn(
            "relative max-h-[38rem] overflow-auto",
            contentClassName
          )}
        >
          <div className="block w-max min-w-max p-4 dark:hidden">
            <SyntaxHighlighter
              language="css"
              style={oneLight}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "0.875rem",
              }}
              wrapLines={true}
              showLineNumbers={false}
              lineProps={() => ({
                style: {
                  backgroundColor: "transparent",
                  display: "block",
                  width: "100%",
                },
              })}
              PreTag="div"
            >
              {String(code)}
            </SyntaxHighlighter>
          </div>
          <div className="hidden w-max min-w-max p-4 dark:block">
            <SyntaxHighlighter
              language="css"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "0.875rem",
              }}
              wrapLines={true}
              showLineNumbers={false}
              lineProps={() => ({
                style: {
                  backgroundColor: "transparent",
                  display: "block",
                  width: "100%",
                },
              })}
              PreTag="div"
            >
              {String(code)}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  )

  if (showPreview && previewContent) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-neutral-300/50 bg-neutral-100/50 p-8 dark:border-neutral-800/60 dark:bg-neutral-900/50">
          {previewContent}
        </div>
        <CodeContent />
      </div>
    )
  }

  return <CodeContent />
}

// Wrapper component for better API
interface CSSCodeBlockWithPreviewProps extends CSSCodeBlockProps {
  preview?: React.ReactNode
}

export function CSSCodeBlockWithPreview({
  preview,
  ...props
}: CSSCodeBlockWithPreviewProps) {
  return (
    <CSSCodeBlock showPreview={!!preview} previewContent={preview} {...props} />
  )
}
