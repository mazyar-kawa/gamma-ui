import { AnimatedList } from "@/registry/gammaui/animated-list"
import CloudFlow from "@/registry/gammaui/cloud-flow"
import CpuArchitecture from "@/registry/gammaui/cpu-architecture"
import ShadCnUI from "@/registry/gammaui/shadcn-ui"

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
  { name: "Social", message: "Video got 1000 likes!", time: "2d ago" },
  { name: "Family", message: "How are you doing?", time: "1w ago" },
  { name: "Friends", message: "Coffee tomorrow?", time: "2d ago" },
  { name: "Movies", message: "Did you see the new movie?", time: "4h ago" },
]

const Components = () => {
  return (
    <div className="mx-auto my-10 flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 w-full max-w-4xl text-center">
        <h1 className="mb-4 bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-100/30">
          Create Stunning Interfaces. No Restrictions.
        </h1>
        <p className="mx-auto max-w-2xl bg-linear-to-br from-black/70 via-black/70 to-black/30 bg-clip-text text-sm text-balance text-transparent sm:text-base md:text-lg dark:from-white/70 dark:via-white/70 dark:to-white/30">
          Gamma UI delivers high-performance, accessible, and fully customizable
          components so you can ship beautiful, responsive designs with ease.
        </p>
      </div>

      {/* Grid Section */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 place-items-center gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-12 flex w-full justify-center rounded-md border px-10">
            <CloudFlow />
          </div>
          <div className="col-span-12 flex w-full justify-center rounded-md border px-10 py-2 sm:col-span-6">
            <CpuArchitecture />
          </div>
          <div className="col-span-12 flex w-full justify-center rounded-md border px-10 py-5 sm:col-span-6">
            <ShadCnUI />
          </div>
          <div className="col-span-12 flex w-full justify-center rounded-md border px-10">
            <div className="bg-background relative h-[400px] w-full overflow-hidden">
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
                    className="bg-card flex w-full max-w-[350px] items-center gap-4 rounded-2xl border p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-sm font-medium text-white">
                      {notification.name.charAt(0)}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">
                          {notification.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {notification.time}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {notification.message}
                      </span>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Components
