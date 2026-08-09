export interface WorkflowTask {
  id: string
  title: string
  description: string
}

export const GAMMA_UI_WORKFLOW_TASKS: WorkflowTask[] = [
  {
    id: "scaffold",
    title: "Scaffold your app",
    description: "Create a Next.js project with TypeScript and Tailwind.",
  },
  {
    id: "shadcn",
    title: "Initialize shadcn/ui",
    description: "Run the CLI init and pick your theme tokens.",
  },
  {
    id: "registry",
    title: "Connect Gamma UI registry",
    description: "Point shadcn at the Gamma UI component registry.",
  },
  {
    id: "add",
    title: "Add components",
    description: "Install blocks with npx shadcn@latest add …",
  },
  {
    id: "compose",
    title: "Compose your UI",
    description: "Drop components into pages and tweak with Tailwind.",
  },
  {
    id: "ship",
    title: "Ship to production",
    description: "Deploy — accessible, motion-ready UI in the wild.",
  },
]
