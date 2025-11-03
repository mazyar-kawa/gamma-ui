import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'GammaUI',
  description:
    'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
  keywords: [
    'GammaUI',
    'UI Library',
    'Component Library',
    'React Components',
    'Next.js',
    'Tailwind CSS',
    'Open Source',
    'Frontend',
    'Design System',
    'Mazyar Kawa',
    'GammaUI by Aman',
    'Copy and Paste Components',
    'Developer Tools',
    'Frontend Engineer',
    'Beautiful UI',
    'React UI Kit',
    'Free React Components',
    'Open Source UI Kit',
    'Tailwind UI Components',
    'Headless UI',
    'Reusable React Components',
    'UI Templates',
    'Accessible React Components',
    'Copy-Paste UI',
    'Next.js Component Library',
    'Open Source Developer Tools',
    'Frontend Design System',
    'Minimal UI Kit',
    'Clean React UI',
  ],
  authors: [{ name: 'Mazyar Kawa', url: 'https://mazyar.dev' }],
  creator: 'Mazyar Kawa',
  publisher: 'Mazyar Kawa',
  openGraph: {
    title: 'GammaUI',
    description:
      'Beautifully designed components you can copy and paste into your apps. Open Source. Customizable. Accessible.',
    url: 'https://gammaui.in',
    siteName: 'GammaUI',
    images: [
      {
        url: 'https://gammaui.in/gammaui-ogimage-v2.png',
        width: 1200,
        height: 630,
        alt: 'GammaUI Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GammaUI',
    description:
      'Open source component library built with accessibility and customization in mind.',
    images: ['https://gammaui.in/gammaui-ogimage-v2.png'],
    site: '@amanshakya0018',
    creator: '@amanshakya0018',
  },
  icons: {
    icon: '/favicon.ico',
  },
  category: 'developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider attribute='class' disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
