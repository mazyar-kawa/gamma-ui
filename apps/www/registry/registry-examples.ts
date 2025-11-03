import { type Registry } from "@/schema"

export const examples: Registry["items"] = [

  {
    name: "android-demo",
    type: "registry:example",
    title: "Android Demo",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["@magicui/android"],
    files: [
      {
        path: "example/android-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  
]