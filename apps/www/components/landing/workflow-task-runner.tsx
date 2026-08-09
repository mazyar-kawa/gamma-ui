"use client"

import { useEffect, useState } from "react"
import { IconCheck, IconLoader2 } from "@tabler/icons-react"
import { motion } from "motion/react"

import { GAMMA_UI_WORKFLOW_TASKS } from "@/config/workflow"
import { cn } from "@/lib/utils"

type TaskStatus = "pending" | "active" | "complete"

const STEP_MS = 2200
const HOLD_COMPLETE_MS = 2800
const TASK_ROW_MIN_HEIGHT = "min-h-[6.75rem]"
const FOOTER_HEIGHT = "h-12"

function getTaskStatus(index: number, activeIndex: number): TaskStatus {
  if (activeIndex >= GAMMA_UI_WORKFLOW_TASKS.length) return "complete"
  if (index < activeIndex) return "complete"
  if (index === activeIndex) return "active"
  return "pending"
}

export function WorkflowTaskRunner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = GAMMA_UI_WORKFLOW_TASKS.length
  const completedCount = activeIndex >= total ? total : activeIndex
  const progress = Math.round((completedCount / total) * 100)
  const isComplete = activeIndex >= total

  useEffect(() => {
    const delay = isComplete ? HOLD_COMPLETE_MS : STEP_MS

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current >= total ? 0 : current + 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, isComplete, total])

  return (
    <div className="border-border/70 bg-card/40 flex min-h-[640px] flex-col overflow-hidden rounded-2xl border shadow-sm backdrop-blur-sm sm:min-h-[680px]">
      <div className="border-border/60 flex shrink-0 flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-foreground text-sm font-semibold">
            Setup pipeline
          </p>
          <p className="text-muted-foreground text-xs">
            Tasks run in order — each step checks off when done.
          </p>
        </div>
        <p className="text-muted-foreground font-mono text-xs tabular-nums">
          {completedCount}/{total} complete · {progress}%
        </p>
      </div>

      <div className="shrink-0 px-5 pt-4 pb-2 sm:px-6">
        <div className="bg-muted h-1.5 overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
      </div>

      <ul
        className="min-h-0 flex-1 space-y-0 px-3 py-2 sm:px-4"
        aria-label="Workflow tasks"
      >
        {GAMMA_UI_WORKFLOW_TASKS.map((task, index) => {
          const status = getTaskStatus(index, activeIndex)
          const isLast = index === total - 1

          return (
            <li key={task.id} className={TASK_ROW_MIN_HEIGHT}>
              <div
                className={cn(
                  "flex h-full gap-4 rounded-xl px-3 py-3 transition-colors duration-300",
                  status === "active" && "bg-primary/5",
                  status === "complete" && "opacity-90"
                )}
              >
                <div className="flex w-7 shrink-0 flex-col items-center pt-0.5">
                  <TaskStatusIcon status={status} />
                  {!isLast ? (
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 h-10 w-px shrink-0",
                        status === "complete" ? "bg-primary/40" : "bg-border"
                      )}
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col pb-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      status === "pending" && "text-muted-foreground",
                      status === "active" && "text-foreground",
                      status === "complete" &&
                        "text-foreground decoration-primary/40 line-through"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-relaxed">
                    {task.description}
                  </p>
                  <p
                    className={cn(
                      "text-primary mt-auto pt-2 text-[11px] font-medium transition-opacity duration-300",
                      status === "active" ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden={status !== "active"}
                  >
                    Processing…
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div
        className={cn(
          "border-border/60 bg-primary/5 text-foreground flex shrink-0 items-center justify-center border-t px-5 text-center text-sm font-medium sm:px-6",
          FOOTER_HEIGHT,
          isComplete ? "opacity-100" : "opacity-0"
        )}
        aria-live="polite"
      >
        All tasks complete — restarting demo
      </div>
    </div>
  )
}

function TaskStatusIcon({ status }: { status: TaskStatus }) {
  if (status === "complete") {
    return (
      <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full">
        <IconCheck className="size-4" stroke={2.5} aria-hidden />
        <span className="sr-only">Complete</span>
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="border-primary bg-background flex size-7 shrink-0 items-center justify-center rounded-full border-2">
        <IconLoader2
          className="text-primary size-3.5 animate-spin"
          aria-hidden
        />
        <span className="sr-only">In progress</span>
      </span>
    )
  }

  return (
    <span className="border-border bg-muted/50 flex size-7 shrink-0 items-center justify-center rounded-full border">
      <span className="sr-only">Pending</span>
    </span>
  )
}
