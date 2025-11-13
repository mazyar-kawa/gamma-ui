import { WavyBlock, WavyBlockItem } from '@/registry/gammaui/wavy-text-block'

const titles = [
  'Flexible',
  'Animated',
  'Customizable',
  'Optimized',
  'Lightweight',
  'Responsive',
  'UI Blocks',
];

export default function DemoOne() {
  return (
     <main className="h-screen pt-60">
       <div className="max-w-6xl w-full ">
      <WavyBlock className="flex flex-col justify-start items-start gap-6">
        {titles.map((title, index) => (
          <WavyBlockItem key={title} index={index}>
            <h2 className="text-[4rem] font-bold leading-none tracking-tighter uppercase whitespace-nowrap">
              {title}
            </h2>
          </WavyBlockItem>
        ))}
      </WavyBlock>
    </div>
     </main>
  )
}
