# Contributing to GammaUI

Thanks for your interest in contributing to **GammaUI** ✨

GammaUI is a modern component & effects library focused on clean APIs, composability, and beautiful defaults. This guide explains the project structure and shows how to add a new component to GammaUI in **~10 minutes**.

You can check an example PR here (recommended):
👉 _Add link to your example PR once available_

---

## Getting Started

### Fork & Clone

1. **Fork the repository**

2. **Clone your fork**

```bash
git clone https://github.com/<YOUR_USERNAME>/gammaui.git
```

3. **Go to the project directory**

```bash
cd gammaui
```

4. **Create a new branch**

```bash
git checkout -b add-my-component
```

5. **Install dependencies**

```bash
pnpm install
```

6. **Create environment file**

```bash
touch .env.local && echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
```

7. **Run the dev server**

```bash
pnpm dev
```

---

## Adding a New Component

To add a new component to GammaUI, you usually only need to touch **5 files** 👌

---

### 1. Create the Component

Create your component inside:

```
registry/gammaui/<component-name>.tsx
```

```tsx
import React from "react";

export function ExampleComponent() {
  return (
    <div className="rounded-xl border p-4">This is a GammaUI component</div>
  );
}
```

---

### 2. Create a Demo Example

Demos are used for docs previews and the registry playground.

Create:

```
registry/example/<component-name>-demo.tsx
```

```tsx
import { ExampleComponent } from "@/registry/gammaui/example-component";

export default function ExampleComponentDemo() {
  return (
    <div className="flex justify-center p-8">
      <ExampleComponent />
    </div>
  );
}
```

---

### 3. Add to Docs Sidebar

Update:

```
config/docs.ts
```

```ts
{
  title: "Example Component",
  href: "/docs/components/example-component",
  items: [],
  label: "New",
}
```

---

### 4. Create Documentation (MDX)

Create:

```
content/docs/components/example-component.mdx
```

````mdx
---
title: Example Component
description: A reusable component from GammaUI
author: gammaui
published: true
---

<ComponentPreview name="example-component-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash
npx shadcn@latest add @gammaui/example-component
```
````

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy the component source into your project.</Step>

<ComponentSource name="example-component" />

<Step>Update import paths if needed.</Step>

<Step>Add required styles or animations.</Step>

</Steps>

</TabsContent>

</Tabs>

## Props

| Prop    | Type   | Default   | Description    |
| ------- | ------ | --------- | -------------- |
| size    | string | "md"      | Component size |
| variant | string | "default" | Visual style   |

```

---

### 5. Register the Component

#### UI Registry

Update:

```

registry/registry-ui.ts

````

```ts
export const ui = [
  {
    name: "example-component",
    type: "registry:ui",
    title: "Example Component",
    description: "A flexible UI component for GammaUI",
    files: [
      {
        path: "registry/gammaui/example-component.tsx",
        type: "registry:ui",
      },
    ],
  },
]
````

#### Examples Registry

Update:

```
registry/registry-examples.ts
```

```ts
export const examples = [
  {
    name: "example-component-demo",
    description: "Example usage of Example Component",
    type: "registry:example",
    registryDependencies: ["example-component"],
    files: [
      {
        path: "registry/example/example-component-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
```

---

### 6. Build the Registry

```bash
pnpm build:registry
```

---

## Adding to the Showcase

### 1. Create a Showcase Entry

```
content/showcase/your-site.mdx
```

```mdx
---
title: yoursite.com
description: Built with GammaUI
image: /showcase/yoursite.png
href: https://yoursite.com
featured: true
---
```

### 2. Add an Image

Upload a screenshot to:

```
public/showcase/yoursite.png
```

---

## Contribution Tips

- Keep components **small & composable**
- Prefer **Tailwind + CSS variables**
- Avoid hard‑coded colors
- Ensure SSR compatibility
- Write clean demos (no business logic)

---

## Need Help?

- Open a GitHub issue
- Start a discussion
- Or submit a draft PR 💜

Welcome to GammaUI 🚀
