"use client"

import React from "react"
import { IconCloud, IconDatabase, IconServer } from "@tabler/icons-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CloudFlowProps {
  className?: string
  centerText?: string
  nodeLabels?: {
    topLeft: string
    topRight: string
    bottomLeft: string
    bottomRight: string
  }
  badges?: {
    left: string
    right: string
  }
  title?: string
  accentColor?: string
}

export default function CloudFlow({
  className,
  centerText,
  nodeLabels,
  badges,
  title,
  accentColor = "#00A6F5",
}: CloudFlowProps) {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Flow Diagram */}
      <svg
        className="text-muted h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.3"
          strokeDasharray="100 100"
          pathLength="100"
        >
          {/* Top Left to Center */}
          <path d="M 25 15 L 25 35 Q 25 40 30 40 L 90 40 Q 95 40 95 45 L 95 48" />
          {/* Top Right to Center */}
          <path d="M 175 15 L 175 35 Q 175 40 170 40 L 110 40 Q 105 40 105 45 L 105 48" />
          {/* Center to Bottom Left */}
          <path d="M 95 62 L 95 65 Q 95 70 90 70 L 30 70 Q 25 70 25 75 L 25 85" />
          {/* Center to Bottom Right */}
          <path d="M 105 62 L 105 65 Q 105 70 110 70 L 170 70 Q 175 70 175 75 L 175 85" />

          {/* Animation */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1.2s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4,0,0.2,1"
            keyTimes="0; 1"
          />
        </g>

        {/* Animated Flow Particles */}
        <g mask="url(#flow-mask-1)">
          <circle
            className="flow-particle-1"
            cx="0"
            cy="0"
            r="10"
            fill="url(#flow-gradient)"
          />
        </g>
        <g mask="url(#flow-mask-2)">
          <circle
            className="flow-particle-2"
            cx="0"
            cy="0"
            r="10"
            fill="url(#flow-gradient)"
          />
        </g>
        <g mask="url(#flow-mask-3)">
          <circle
            className="flow-particle-3"
            cx="0"
            cy="0"
            r="10"
            fill="url(#flow-gradient)"
          />
        </g>
        <g mask="url(#flow-mask-4)">
          <circle
            className="flow-particle-4"
            cx="0"
            cy="0"
            r="10"
            fill="url(#flow-gradient)"
          />
        </g>

        {/* Node Badges */}
        <g stroke="currentColor" fill="none" strokeWidth="0.3">
          {/* Top Left Node */}
          <g>
            <rect fill="#0F172A" x="8" y="10" width="34" height="10" rx="5" />
            <IconServer x="12" y="12.5" size={6} color={accentColor} />
            <text
              x="21"
              y="17"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="500"
            >
              {nodeLabels?.topLeft || "API"}
            </text>
          </g>

          {/* Top Right Node */}
          <g>
            <rect fill="#0F172A" x="158" y="10" width="34" height="10" rx="5" />
            <IconCloud x="162" y="12.5" size={6} color={accentColor} />
            <text
              x="171"
              y="17"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="500"
            >
              {nodeLabels?.topRight || "CDN"}
            </text>
          </g>

          {/* Bottom Left Node */}
          <g>
            <rect fill="#0F172A" x="8" y="85" width="34" height="10" rx="5" />
            <IconDatabase x="12" y="87.5" size={6} color={accentColor} />
            <text
              x="21"
              y="92"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="500"
            >
              {nodeLabels?.bottomLeft || "DB"}
            </text>
          </g>
        </g>

        <defs>
          {/* Flow Path Masks */}
          <mask id="flow-mask-1">
            <path
              d="M 25 15 L 25 35 Q 25 40 30 40 L 90 40 Q 95 40 95 45 L 95 48"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="flow-mask-2">
            <path
              d="M 175 15 L 175 35 Q 175 40 170 40 L 110 40 Q 105 40 105 45 L 105 48"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="flow-mask-3">
            <path
              d="M 95 62 L 95 65 Q 95 70 90 70 L 30 70 Q 25 70 25 75 L 25 85"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="flow-mask-4">
            <path
              d="M 105 62 L 105 65 Q 105 70 110 70 L 170 70 Q 175 70 175 75 L 175 85"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>

          {/* Gradient */}
          <radialGradient id="flow-gradient" fx="1">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main Container */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* Shadow */}
        <div className="bg-accent/20 absolute -bottom-4 h-[100px] w-[62%] rounded-xl blur-xl" />

        {/* Title Badge */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-gradient-to-r from-slate-900 to-slate-800 px-3 py-1.5 shadow-lg sm:-top-4">
          <IconCloud className="size-3.5" color={accentColor} />
          <span className="ml-2 text-[11px] font-medium text-white">
            {title || "Distributed Cloud Architecture"}
          </span>
        </div>

        {/* Center Hub Circle */}
        <div
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full bg-slate-900 text-xs font-bold shadow-xl"
          style={{
            color: accentColor,
            border: `1px solid ${accentColor}`,
          }}
        >
          {centerText || "HUB"}
        </div>

        {/* Main Content Box */}
        <div className="bg-background relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl border shadow-2xl">
          {/* Info Badges */}
          <div className="absolute bottom-8 left-12 z-10 flex h-8 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
            <IconServer className="size-4" color={accentColor} />
            <span>{badges?.left || "Live Traffic"}</span>
          </div>
          <div className="absolute top-8 right-16 z-10 hidden h-8 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm sm:flex">
            <IconDatabase className="size-4" color={accentColor} />
            <span>{badges?.right || "Sync Active"}</span>
          </div>

          {/* Animated Concentric Circles */}
          <motion.div
            className="bg-accent/5 absolute -bottom-14 h-[100px] w-[100px] rounded-full border border-emerald-500/20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-20 h-[145px] w-[145px] rounded-full border border-emerald-500/15"
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border border-emerald-500/10"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
          <motion.div
            className="bg-accent/5 absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border border-emerald-500/5"
            animate={{
              scale: [1, 1.01, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
        </div>
      </div>
    </div>
  )
}
