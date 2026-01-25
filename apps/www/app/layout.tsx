import type { Metadata, Viewport } from "next"

import "./globals.css"

import { absoluteUrl, constructMetadata } from "@/lib/utils"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = constructMetadata({
  title: "Gamma UI",
  description:
    "Beautifully designed landing page components built with React & Tailwind CSS & Motion.",
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
