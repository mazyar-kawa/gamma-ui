import LandingNavbar from "@/components/landing/landing-navbar"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-white dark:bg-neutral-950">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
