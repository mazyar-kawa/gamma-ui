"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

type Props = {
  className?: string
}

const MyLogo: React.FC<Props> = ({ className = "size-16" }) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // fallback (avoid hydration mismatch)
    return (
      <div className="flex items-center">
        <Image
          src="/gamma-ui-dark.svg"
          alt="gamma logo"
          width={500}
          height={500}
          className={className}
        />
      </div>
    )
  }

  return (
    <Link href="/" className="flex items-center">
      <Image
        src={`/gamma-ui-${resolvedTheme}.svg`}
        alt="gamma logo"
        width={500}
        height={500}
        className={className}
      />
      <span className="mr-4 hidden text-xl font-bold text-black sm:block dark:text-white">
        Gamma UI
      </span>
    </Link>
  )
}

export default MyLogo
