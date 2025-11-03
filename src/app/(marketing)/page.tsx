import Features from '@/components/landing/features'
import Hero from '@/components/landing/hero'

export default function Home() {
  return (
    <div className='flex flex-col bg-background'>
      <Hero />
      <Features />
    </div>
  )
}
