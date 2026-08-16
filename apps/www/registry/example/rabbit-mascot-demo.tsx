"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  RABBIT_MOOD_LABELS,
  RABBIT_MOODS,
  RabbitMascot,
  type RabbitMood,
} from "@/registry/gammaui/rabbit-mascot"

export function RabbitMascotDemo() {
  const [mood, setMood] = useState<RabbitMood>("neutral")

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <RabbitMascot mood={mood} size={320} />

      <p className="text-muted-foreground text-sm">
        Current mood:{" "}
        <span className="text-foreground font-medium">
          {RABBIT_MOOD_LABELS[mood]}
        </span>
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {RABBIT_MOODS.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={mood === item ? "default" : "outline"}
            onClick={() => setMood(item)}
          >
            {RABBIT_MOOD_LABELS[item]}
          </Button>
        ))}
      </div>
    </div>
  )
}
