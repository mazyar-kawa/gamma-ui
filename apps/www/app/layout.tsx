import type { Metadata, Viewport } from "next"

import "./globals.css"

import { absoluteUrl, constructMetadata } from "@/lib/utils"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = constructMetadata({
  title: "Magic UI",
  description:
    "Beautiful UI components and templates to make your landing page look stunning.",
  image: absoluteUrl("/og"),
})

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
