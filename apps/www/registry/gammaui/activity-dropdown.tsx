"use client"

import type React from "react"
import { useState } from "react"
import {
  IconAward,
  IconBell,
  IconCalendar,
  IconCheckbox,
  IconChevronUp,
  IconMessageCircle,
  IconTag,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

interface Activity {
  id: number
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: 1,
    icon: <IconMessageCircle className="h-4 w-4" />,
    iconBg: "bg-neutral-700 dark:bg-neutral-700 bg-neutral-200",
    title: "New Message!",
    description: "Sarah sent you a message.",
    time: "Just Now",
  },
  {
    id: 2,
    icon: <IconAward className="h-4 w-4" />,
    iconBg: "bg-neutral-700 dark:bg-neutral-700 bg-neutral-200",
    title: "Level Up!",
    description: "You've unlocked a new achievement.",
    time: "2 min ago",
  },
  {
    id: 3,
    icon: <IconCalendar className="h-4 w-4" />,
    iconBg: "bg-neutral-700 dark:bg-neutral-700 bg-neutral-200",
    title: "Reminder: Meeting Today",
    description: "Your team meeting starts in 30 minutes.",
    time: "3 hour ago",
  },
  {
    id: 4,
    icon: <IconTag className="h-4 w-4" />,
    iconBg: "bg-neutral-700 dark:bg-neutral-700 bg-neutral-200",
    title: "Special Offer!",
    description: "Save 20% off on subscription upgrade.",
    time: "12 hours ago",
  },
  {
    id: 5,
    icon: <IconCheckbox className="h-4 w-4" />,
    iconBg: "bg-neutral-700 dark:bg-neutral-700 bg-neutral-200",
    title: "Task Assigned!",
    description: "A new task is awaiting your action.",
    time: "Yesterday",
  },
]

export default function ActivityDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn(
        "w-full max-w-md cursor-pointer overflow-hidden rounded-2xl shadow-2xl select-none",
        "bg-white dark:bg-neutral-900",
        "shadow-xl shadow-black/10 dark:shadow-black/50",
        "transition-all duration-500 ease-in-out",
        isOpen ? "rounded-3xl" : "rounded-2xl"
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 dark:bg-neutral-800">
          <IconBell className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            5 New Activities
          </h3>
          <p
            className={cn(
              "text-sm text-neutral-500 dark:text-neutral-400",
              "transition-all duration-500 ease-in-out",
              isOpen ? "mt-0 max-h-0 opacity-0" : "mt-0.5 max-h-6 opacity-100"
            )}
          >
            What's happening around you
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center">
          <IconChevronUp
            className={cn(
              "h-5 w-5 text-neutral-400 transition-transform duration-500 ease-in-out",
              isOpen ? "rotate-0" : "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Activity List */}
      <div
        className={cn(
          "grid",
          "transition-all duration-500 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-2 pb-4">
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3",
                    "transition-all duration-500 ease-in-out",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 dark:bg-neutral-700">
                    <span className="text-neutral-600 dark:text-neutral-300">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {activity.title}
                    </h4>
                    <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="shrink-0 pt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
