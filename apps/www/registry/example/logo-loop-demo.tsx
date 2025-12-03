import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandAws,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGoogle,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandStripe,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
} from "@tabler/icons-react"

import { LogoLoop } from "@/registry/gammaui/logo-loop"

const techLogos = [
  {
    node: <IconBrandReact size={48} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <IconBrandNextjs size={48} />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <IconBrandTypescript size={48} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <IconBrandTailwind size={48} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  // --- Added Logos ---
  {
    node: <IconBrandVercel size={48} />,
    title: "Vercel",
    href: "https://vercel.com",
  },
  {
    node: <IconBrandNodejs size={48} />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <IconBrandGithub size={48} />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <IconBrandGitlab size={48} />,
    title: "GitLab",
    href: "https://gitlab.com",
  },
  {
    node: <IconBrandDocker size={48} />,
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    node: <IconBrandJavascript size={48} />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <IconBrandHtml5 size={48} />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    node: <IconBrandCss3 size={48} />,
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    node: <IconBrandFigma size={48} />,
    title: "Figma",
    href: "https://figma.com",
  },
  {
    node: <IconBrandAws size={48} />,
    title: "Amazon AWS",
    href: "https://aws.amazon.com",
  },
  {
    node: <IconBrandGoogle size={48} />,
    title: "Google",
    href: "https://google.com",
  },
  {
    node: <IconBrandStripe size={48} />,
    title: "Stripe",
    href: "https://stripe.com",
  },
  {
    node: <IconBrandFirebase size={48} />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: <IconBrandSupabase size={48} />,
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    node: <IconBrandApple size={48} />,
    title: "Apple",
    href: "https://apple.com",
  },
  {
    node: <IconBrandAndroid size={48} />,
    title: "Android",
    href: "https://www.android.com",
  },
]

export function LogoLoopDemo() {
  return (
    <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={techLogos}
        speed={50}
        direction="left"
        gap={80}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        ariaLabel="Technology partners"
      />
    </div>
  )
}
