"use client"

import React from "react"
import {
  IconFolder,
  IconHeartHandshake,
  IconSparkles,
} from "@tabler/icons-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface RestApiProps {
  className?: string
  circleText?: string
  badgeTexts?: {
    first: string
    second: string
    third: string
    fourth: string
  }
  buttonTexts?: {
    first: string
    second: string
  }
  title?: string
  lightColor?: string
}

export default function RestApi({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: RestApiProps) {
  const { resolvedTheme } = useTheme()
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="text-muted h-full sm:w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button */}
          <g>
            <rect
              fill="#18181B"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
            <text
              x="28"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect
              fill="#18181B"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
            <text
              x="74"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect
              fill="#18181B"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
            <text
              x="122"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect
              fill="#18181B"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            ></rect>
            <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
            <text
              x="165"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="bg-accent/30 absolute -bottom-4 h-[100px] w-[62%] rounded-lg" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 py-1 sm:-top-4 sm:py-1.5">
          <IconSparkles className="size-3 text-white" />
          <span className="ml-2 text-[10px] text-white">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t bg-[#141516] text-xs font-semibold text-white">
          {circleText ? circleText : "SVG"}
        </div>
        {/* box content */}
        <div className="bg-background relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border shadow-md">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 flex h-7 items-center gap-2 rounded-full border bg-[#101112] px-3 text-xs text-white">
            <IconHeartHandshake className="size-4" />
            <span>{buttonTexts?.first || "Gamma UI"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 items-center gap-2 rounded-full border bg-[#101112] px-3 text-xs text-white sm:flex">
            <IconFolder className="size-4" />
            <span>{buttonTexts?.second || "v2_updates"}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="bg-accent/5 absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}
