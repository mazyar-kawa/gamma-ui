"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { CommandMenu } from "../command-menu"
import { GithubLink } from "../github-link"
import { ModeToggle } from "../mode-toggle"
import MyLogo from "../my-logo"
import { TwitterLink } from "../x-link"

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  function handleScroll() {
    if (window.scrollY > 0) {
      return setIsScrolled(true)
    }

    return setIsScrolled(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "w-fullt ransition-all sticky top-0 z-50 duration-300",
        isScrolled
          ? "border-b shadow-lg backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-900/40"
          : "border-transparent bg-transparent shadow-none backdrop-blur-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-3 md:px-5 lg:px-8">
        <div className="flex h-[3.7rem] items-center justify-between">
          <MyLogo />

          <div className="hidden items-center space-x-2 lg:flex">
            <CommandMenu />
            <div className="flex items-center gap-4 opacity-50 dark:opacity-80">
              <GithubLink />
              <TwitterLink />
              <ModeToggle />
            </div>
          </div>
          <div className="flex items-center space-x-1 opacity-50 lg:hidden dark:opacity-80">
            <GithubLink />
            <TwitterLink />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar
