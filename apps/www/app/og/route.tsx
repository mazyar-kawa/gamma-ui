// import Image from "next/image"
import { ImageResponse } from "next/og"

import { Icons } from "@/components/icons"

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ])

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const description = searchParams.get("description")

  const [fonts] = await Promise.all([loadAssets()])

  return new ImageResponse(
    <div
      tw="flex h-full w-full relative"
      style={{
        fontFamily: "Geist Sans",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)",
      }}
    >
      {/* Gradient orbs — white/grey tones */}
      <div
        tw="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          top: "-150px",
          left: "-150px",
          filter: "blur(80px)",
        }}
      />
      <div
        tw="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #d4d4d4 0%, transparent 70%)",
          bottom: "-200px",
          right: "-200px",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        tw="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Thin white top-edge highlight */}
      <div
        tw="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />

      {/* Content container */}
      <div tw="flex flex-col relative z-10 justify-between p-16 w-full h-full">
        {/* Top branding */}
        <div tw="flex flex-row items-center">
          <Icons.logo width={80} height={80} />
          <div
            tw="text-white flex text-[28px] font-semibold"
            style={{ color: "#ffffff" }}
          >
            Gamma UI
          </div>
        </div>

        {/* Main content */}
        {title || description ? (
          <div tw="flex flex-col w-full max-w-[900px]">
            <div
              tw="tracking-tight flex flex-col font-semibold mb-6"
              style={{
                fontSize: "72px",
                lineHeight: "1.1",
                color: "#ffffff",
                textShadow: "0 4px 30px rgba(255, 255, 255, 0.15)",
              }}
            >
              {title}
            </div>
            {description && (
              <div
                tw="text-[36px] font-normal mb-8"
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: "1.4",
                }}
              >
                {description}
              </div>
            )}
          </div>
        ) : (
          <div tw="flex flex-col w-full">
            <div
              tw="flex font-semibold mb-6"
              style={{
                fontSize: "80px",
                lineHeight: "1.1",
                color: "#ffffff",
                textShadow: "0 4px 30px rgba(255, 255, 255, 0.15)",
              }}
            >
              Modern Next.js Templates
            </div>
            <div
              tw="text-[32px] flex font-normal"
              style={{
                color: "rgba(255, 255, 255, 0.55)",
                lineHeight: "1.5",
              }}
            >
              Built with React, TypeScript, shadcn/ui, Tailwind CSS, and Motion
            </div>
          </div>
        )}

        {/* Bottom tech stack badges */}
        <div tw="flex flex-row items-center flex-wrap">
          {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
            <div
              key={tech}
              tw="flex px-5 py-3 rounded-full text-[18px] font-medium mx-1"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        tw="absolute bottom-0 right-0 w-64 h-64 opacity-10"
        style={{
          background:
            "linear-gradient(135deg, transparent 50%, white 50%, white 52%, transparent 52%)",
        }}
      />
    </div>,
    {
      width: 1200,
      height: 628,
      fonts,
    }
  )
}
