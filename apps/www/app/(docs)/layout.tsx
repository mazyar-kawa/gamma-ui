import { DocsSidebar } from '@/components/docs-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className='max-w-7xl mx-auto flex flex-1 flex-col px-2'>
      <SiteHeader />
      <SidebarProvider className='3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]'>
        <DocsSidebar />
        <Suspense>
          <div className='h-full w-full'>{children}</div>
        </Suspense>
      </SidebarProvider>
       <Toaster />
    </div>
  )
}
