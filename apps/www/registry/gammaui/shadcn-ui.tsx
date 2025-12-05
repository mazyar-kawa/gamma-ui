"use client"

import { AnimationGeneratorType, motion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { TextShimmer } from "@/components/motion-primitives/text-shimmer"

const YourAppVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 0.2,
    scale: 1,
  },
}

const YourAppTransition: {
  duration: number
  type: AnimationGeneratorType
  damping: number
  bounce: number
  mass: number
} = {
  duration: 0.2,
  type: "spring",
  damping: 20,
  bounce: 0.1,
  mass: 2,
}

interface ShadCnUIProps {
  className?: string
  circleText?: string
  triangleText?: string
  diamondText?: string
  animatedText?: string
  animatedBoxText?: string
  hintText?: string
  appName?: string
}

export default function ShadCnUI({
  className,
  animatedBoxText = "Sidebar",
  animatedText = "npx shadcn add",
  appName = "Your App",
  circleText = "Registry",
  diamondText = "Registry",
  hintText = "(components.json)",
  triangleText = "AI",
}: ShadCnUIProps) {
  const { resolvedTheme } = useTheme()
  return (
    <div className={cn("text-muted relative", className)}>
      {/* SVG */}
      <svg width="100%" height="100%" viewBox="0 0 200 100">
        <defs>
          <mask id="shadn-mask1">
            <path
              d="M 35 14 h 25 q 5 0 5 5 v 23 q 0 5 5 5 h 15"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="shadn-mask2">
            <path d="M 30 50 h 52" strokeWidth="0.5" stroke="white" />
          </mask>
          <mask id="shadn-mask3">
            <path
              d="M 36.3 87 h 24 q 5 0 5 -5 v -24 q 0 -5 5 -5 h 15"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <radialGradient id="shadcn-white-grad" fx="1">
            <stop offset="0%" stopColor="gray" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Paths */}
        <g
          stroke="#181818"
          fill="none"
          strokeWidth="0.3"
          strokeDasharray="100 100"
          pathLength="100"
          strokeOpacity="0"
        >
          <path d="M 35 14 h 25 q 5 0 5 5 v 23 q 0 5 5 5 h 15" />
          <path d="M 30 50 h 52" />
          <path d="M 36.3 87 h 24 q 5 0 5 -5 v -24 q 0 -5 5 -5 h 15" />
          <path d="M 160 36 h -10 q -5 0 -5 5 v 4 q 0 5 -5 5 h -20" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
            begin="1.2s"
          />
          <animate
            attributeName="stroke-opacity"
            dur="0.2s"
            from="0"
            to="1"
            fill="freeze"
            begin="1.2s"
          />
        </g>
        {/* Left-Hand Shapes */}
        <g stroke="#4d4d4d" strokeWidth="0.2" fill="none">
          {/* Registry Circle */}
          <circle
            cx="23"
            cy="14"
            r="12"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.5"
            strokeOpacity="0.8"
            stroke={resolvedTheme === "dark" ? "white" : "black"}
          />
          <text
            x="23"
            y="14"
            textAnchor="middle"
            dy=".3em"
            fontSize="3.5"
            fontWeight="300"
          >
            {circleText}
          </text>
          {/* AI Trinangle */}
          <path
            d="M 23 40 l 15 20 h -30 z"
            strokeDasharray="2 3"
            opacity="0.5"
            strokeOpacity="0.8"
            stroke={resolvedTheme === "dark" ? "white" : "black"}
          />
          <text
            x="21"
            y="54"
            textAnchor="middle"
            dy=".3em"
            fontSize="4"
            fontWeight="300"
          >
            {triangleText}
          </text>
          <path
            transform="scale(0.2)"
            opacity={0.5}
            d="M130 260 a6 6 0 0 1-6 6 6 6 0 0 1 6 6 6 6 0 0 1 6-6 6 6 0 0 1-6-6m7.5 11a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1-2.5-2.5"
            fill="#71717A"
            strokeWidth="1"
          />
          {/* Registry Polygon */}
          <path
            d="M 23 73 l 14 14 l -14 14 l -14 -14 z"
            strokeDasharray="2 3"
            opacity="0.5"
            strokeOpacity="0.8"
            stroke={resolvedTheme === "dark" ? "white" : "black"}
          />
          <text
            x="23"
            y="87"
            textAnchor="middle"
            dy=".3em"
            fontSize="3.5"
            stroke="#4d4d4d"
            fontWeight="300"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {diamondText}
          </text>
        </g>
        {/* Right-Hand Shapes */}
        <g stroke="currentColor" strokeWidth="0.2" fill="none">
          <motion.rect
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            transition={YourAppTransition}
            x="160"
            y="29.5"
            width="14"
            height="14"
            rx="3"
            strokeDasharray="2 2"
          />
          <motion.rect
            variants={YourAppVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.3 }}
            x="176"
            y="29.5"
            width="14"
            height="14"
            rx="3"
            fill="#0C0D0E"
            strokeOpacity="0.4"
            stroke="white"
          />
          <motion.rect
            variants={YourAppVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.6 }}
            x="160"
            y="45.5"
            width="14"
            height="14"
            rx="3"
            fill="#0C0D0E"
            strokeOpacity="0.4"
            stroke="white"
          />
          <motion.rect
            variants={YourAppVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.9 }}
            x="176"
            y="45.5"
            width="14"
            height="14"
            rx="3"
            fill="#0C0D0E"
            strokeOpacity="0.4"
            stroke="white"
          />
          <motion.text
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 1.5 }}
            x="175"
            y="64"
            textAnchor="middle"
            dy=".3em"
            fontSize="3.5"
            fill="#606067"
            fontWeight="200"
          >
            {appName}
          </motion.text>
        </g>
        {/* Animated Lights */}
        <g mask="url(#shadn-mask1)">
          <circle
            className="shadcn shadcn-line-1"
            cx="0"
            cy="0"
            r="8"
            fill="url(#shadcn-white-grad)"
          />
        </g>
        <g mask="url(#shadn-mask2)">
          <circle
            className="shadcn shadcn-line-2"
            cx="0"
            cy="0"
            r="8"
            fill="url(#shadcn-white-grad)"
          />
        </g>
        <g mask="url(#shadn-mask3)">
          <circle
            className="shadcn shadcn-line-3"
            cx="0"
            cy="0"
            r="8"
            fill="url(#shadcn-white-grad)"
          />
        </g>
        {/* Animated - Comp Box */}
        <g
          className="compBox"
          stroke="currentColor"
          strokeWidth="0.2"
          style={{
            transform: "translateX(0px) translateY(-0.5px)",
            transformOrigin: "7px 7px",
          }}
        >
          <rect width="14" height="14" rx="3" fill="#131313" stroke="#1D1D1D" />
          <text
            x="7"
            y="5"
            textAnchor="middle"
            fontSize="3"
            stroke="#71717A"
            fontWeight="200"
          >
            {"</>"}
          </text>
          <text
            x="7"
            y="14"
            textAnchor="middle"
            fontSize="2.5"
            stroke="#71717A"
            fontWeight="200"
            style={{
              transformOrigin: "7px 11.5px",
              rotate: "180deg",
            }}
          >
            {animatedBoxText}
          </text>
        </g>
      </svg>
      {/* Shadcn Box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Shadcn TextBox */}
        <div className="relative flex justify-center rounded-md bg-[#1c1c1c] px-4 py-1 text-sm shadow-sm">
          <p className="absolute -bottom-5 text-[10px] text-black dark:text-zinc-600">
            {hintText}
          </p>
          <TextShimmer delay={3.8} repeatDelay={1.8}>
            {animatedText}
          </TextShimmer>
        </div>
      </div>
    </div>
  )
}
