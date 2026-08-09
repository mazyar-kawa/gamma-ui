import { AnimatedList } from "@/registry/gammaui/animated-list"
import CloudFlow from "@/registry/gammaui/cloud-flow"
import CpuArchitecture from "@/registry/gammaui/cpu-architecture"
import ShadCnUI from "@/registry/gammaui/shadcn-ui"

import { cn } from "@/lib/utils"

import { SectionHeader } from "./section-header"

const notifications = [
  { name: "Location", message: "Thomas has arrived home", time: "2h ago" },
  { name: "Fitness", message: "Daily step goal reached!", time: "1h ago" },
  {
    name: "Calendar",
    message: "Team meeting in 30 minutes",
    time: "45m ago",
  },
  { name: "Tasks", message: "3 tasks due today", time: "1d ago" },
  { name: "Health", message: "Heart rate elevated", time: "3h ago" },
  { name: "Email", message: "New message from manager", time: "5m ago" },
]

function ShowcaseCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "border-border/70 bg-background/80 relative overflow-hidden rounded-2xl border p-4 shadow-sm backdrop-blur-sm sm:p-6",
        className
      )}
    >
      {children}
    </div>
  )
}

function Components() {
  return (
    <section className="bg-muted/30 border-border/60 border-y">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label="01 — Library"
            title="Components that feel designed, not assembled"
            description="Live previews from the registry — motion, 3D, and product UI patterns you can install in one command."
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <ShowcaseCell className="flex min-h-[260px] items-center justify-center lg:col-span-7 lg:min-h-[320px]">
            <CloudFlow />
          </ShowcaseCell>

          <ShowcaseCell className="flex items-center justify-center lg:col-span-5">
            <CpuArchitecture />
          </ShowcaseCell>

          <ShowcaseCell className="flex items-center justify-center lg:col-span-5">
            <ShadCnUI />
          </ShowcaseCell>

          <ShowcaseCell className="p-2 lg:col-span-7 lg:p-4">
            <div className="relative h-[360px] w-full overflow-hidden rounded-xl sm:h-[400px]">
              <AnimatedList
                stackGap={20}
                columnGap={70}
                scaleFactor={0.05}
                scrollDownDuration={5}
                formationDuration={1}
              >
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="bg-card flex w-full max-w-[340px] items-center gap-4 rounded-2xl border p-4 shadow-sm"
                  >
                    <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                      {notification.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground truncate text-sm font-medium">
                          {notification.name}
                        </span>
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground truncate text-sm">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </ShowcaseCell>
        </div>
      </div>
    </section>
  )
}

export default Components
