'use client'

import { highlightCode } from '@/lib/highlight-code'
import  { useState , useEffect} from 'react'
import { getIconForLanguageExtension } from './icons'
import { CopyButton } from './copy-button'

function ComponentCode({
  code,
  language,
  title,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
 const [highlighted, setHighlighted] = useState<string>('')

  const isDark = typeof window !== 'undefined'
    ? document.documentElement.classList.contains('dark')
    : false

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      highlightCode(code, language, dark ? 'github-dark' : 'github-light').then(setHighlighted)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Initial render
    highlightCode(code, language, isDark ? 'github-dark' : 'github-light').then(setHighlighted)

    return () => observer.disconnect()
  }, [code, language, isDark])

  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      <div className='flex items-center justify-between'>
        {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlighted }} />
    </figure>
  )
}

export default ComponentCode