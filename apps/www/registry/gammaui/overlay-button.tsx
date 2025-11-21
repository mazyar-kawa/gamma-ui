"use client"

import { motion } from "motion/react"

interface OverlayButtonProps {
  label: string
}

export default function OverlayButton({ label }: OverlayButtonProps) {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1.5 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="radial-gradient relative rounded-xl px-2 py-1"
    >
      <span className="linear-overlay absolute inset-0 top-0 left-0 h-full w-full rounded-xl" />
      <span className="linear-mask relative block h-full w-full font-light text-neutral-100">
        {label}
      </span>
    </motion.button>
  )
}
