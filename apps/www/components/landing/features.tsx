import Link from "next/link"
import { IconArrowRight, IconBook2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

import { SectionHeader } from "./section-header"
import { WorkflowTaskRunner } from "./workflow-task-runner"

function Features() {
  return (
    <section className="border-border/40 mx-auto w-full max-w-7xl border-t px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <SectionHeader
            label="02 — Workflow"
            title="Every step checked off, one task at a time"
            description="From scaffold to ship — Gamma UI follows the same shadcn workflow you already know. Watch the pipeline advance as each task completes."
            className="mb-8 max-w-xl"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <Link href="/docs/quick-start">
                Quick start
                <IconArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/docs/introduction">
                <IconBook2 className="size-4 opacity-70" />
                Documentation
              </Link>
            </Button>
          </div>
        </div>

        <WorkflowTaskRunner />
      </div>
    </section>
  )
}

export default Features
