import LandingNavbar from "@/components/landing/landing-navbar"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
