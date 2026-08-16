"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RabbitMascot, type RabbitMood } from "@/registry/gammaui/rabbit-mascot"

const CONSENT_KEY = "gammaui-cookie-consent"

const ANIM = {
  ease: {
    reach: [0.33, 1, 0.68, 1] as const,
    pull: [0.45, 0.05, 0.25, 1] as const,
    soft: [0.25, 0.1, 0.25, 1] as const,
  },
  speed: 320,
  reachMinMs: 520,
  reachMaxMs: 880,
  pullMinMs: 560,
  pullMaxMs: 920,
  retractMs: 620,
  grabHoldMs: 140,
  armFadeInMs: 280,
  armFadeOutMs: 360,
  eatMs: 320,
  declineFadeMs: 420,
} as const

interface ConsentLayout {
  rabbitSize: number
  pawSize: number
  armStroke: number
}

const DEFAULT_LAYOUT: ConsentLayout = {
  rabbitSize: 132,
  pawSize: 32,
  armStroke: 12,
}

function getConsentLayout(width: number): ConsentLayout {
  if (width < 640) {
    return { rabbitSize: 118, pawSize: 28, armStroke: 11 }
  }
  if (width < 768) {
    return { rabbitSize: 132, pawSize: 32, armStroke: 12 }
  }
  if (width < 1024) {
    return { rabbitSize: 148, pawSize: 34, armStroke: 13 }
  }
  return { rabbitSize: 160, pawSize: 36, armStroke: 14 }
}

function useConsentLayout() {
  const [layout, setLayout] = useState<ConsentLayout>(() => {
    if (typeof window === "undefined") return DEFAULT_LAYOUT
    return getConsentLayout(window.innerWidth)
  })

  useEffect(() => {
    function handleResize() {
      setLayout(getConsentLayout(window.innerWidth))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return layout
}

const EASE_REACH = ANIM.ease.reach
const EASE_PULL = ANIM.ease.pull

interface Point {
  x: number
  y: number
}

interface ReachGeometry {
  from: Point
  cookie: Point
  mouth: Point
}

interface CookieConsentProps {
  className?: string
}

function waitMs(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

function waitFrames(count = 2) {
  return new Promise<void>((resolve) => {
    let remaining = count
    function step() {
      remaining -= 1
      if (remaining <= 0) resolve()
      else requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("drop-shadow-md", className)}
    >
      <circle
        cx="32"
        cy="34"
        r="24"
        fill="#E8B56A"
        stroke="#C8944A"
        strokeWidth="2"
      />
      <circle cx="24" cy="28" r="3.5" fill="#6B4226" />
      <circle cx="38" cy="26" r="3" fill="#6B4226" />
      <circle cx="42" cy="38" r="3.2" fill="#6B4226" />
      <circle cx="28" cy="42" r="2.8" fill="#6B4226" />
      <circle cx="34" cy="32" r="2.5" fill="#6B4226" />
      <ellipse cx="26" cy="30" rx="6" ry="4" fill="#F5D092" opacity="0.55" />
    </svg>
  )
}

function getBezierControl(from: Point, to: Point) {
  const dx = to.x - from.x
  const distance = Math.hypot(dx, to.y - from.y)
  const lift = Math.min(28, Math.max(8, distance * 0.16))

  return {
    x: from.x + dx * 0.46,
    y: Math.min(from.y, to.y) - lift,
  }
}

function durationForDistance(
  from: Point,
  to: Point,
  minMs: number,
  maxMs: number
) {
  const distance = Math.hypot(to.x - from.x, to.y - from.y)
  const ms = (distance / ANIM.speed) * 1000
  return Math.round(Math.min(maxMs, Math.max(minMs, ms)))
}

function pointOnBezier(
  from: Point,
  control: Point,
  to: Point,
  t: number
): Point {
  const mt = 1 - t

  return {
    x: mt * mt * from.x + 2 * mt * t * control.x + t * t * to.x,
    y: mt * mt * from.y + 2 * mt * t * control.y + t * t * to.y,
  }
}

function buildArmPath(from: Point, to: Point) {
  const control = getBezierControl(from, to)
  return `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`
}

async function animateAlongBezier({
  from,
  to,
  duration,
  ease,
  onUpdate,
}: {
  from: Point
  to: Point
  duration: number
  ease: readonly [number, number, number, number]
  onUpdate: (point: Point) => void
}) {
  const control = getBezierControl(from, to)

  await animate(0, 1, {
    duration: duration / 1000,
    ease,
    onUpdate: (progress) =>
      onUpdate(pointOnBezier(from, control, to, progress)),
  })
}

function ReachArm({
  geometry,
  pawX,
  pawY,
  pawScale,
  opacity,
  pawSize,
  armStroke,
}: {
  geometry: ReachGeometry
  pawX: ReturnType<typeof useMotionValue<number>>
  pawY: ReturnType<typeof useMotionValue<number>>
  pawScale: ReturnType<typeof useMotionValue<number>>
  opacity: ReturnType<typeof useMotionValue<number>>
  pawSize: number
  armStroke: number
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const shadeRef = useRef<SVGPathElement>(null)

  const updatePath = useCallback(() => {
    const point = { x: pawX.get(), y: pawY.get() }
    const path = buildArmPath(geometry.from, point)
    pathRef.current?.setAttribute("d", path)
    shadeRef.current?.setAttribute("d", path)
  }, [geometry.from, pawX, pawY])

  useLayoutEffect(() => {
    updatePath()
  }, [updatePath])

  useMotionValueEvent(pawX, "change", updatePath)
  useMotionValueEvent(pawY, "change", updatePath)

  const pawRotate = useTransform([pawX, pawY], ([x, y]: number[]) => {
    const dx = x - geometry.from.x
    const dy = y - geometry.from.y
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90
  })

  return (
    <>
      <motion.svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 overflow-visible will-change-transform"
        width="100%"
        height="100%"
        style={{ opacity }}
      >
        <defs>
          <linearGradient
            id="cookie-arm-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#fff9f7" />
            <stop offset="50%" stopColor="#f5ebe8" />
            <stop offset="100%" stopColor="#eedfd9" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={buildArmPath(geometry.from, geometry.from)}
          fill="none"
          stroke="url(#cookie-arm-gradient)"
          strokeWidth={armStroke}
          strokeLinecap="round"
        />
        <path
          ref={shadeRef}
          d={buildArmPath(geometry.from, geometry.from)}
          fill="none"
          stroke="#c9a99e"
          strokeWidth={Math.max(4, armStroke * 0.42)}
          strokeLinecap="round"
          opacity={0.16}
        />
      </motion.svg>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-40 will-change-transform"
        style={{
          x: pawX,
          y: pawY,
          scale: pawScale,
          rotate: pawRotate,
          translateX: "-50%",
          translateY: "-50%",
          opacity,
        }}
      >
        <svg
          viewBox="0 0 60 60"
          aria-hidden
          width={pawSize}
          height={pawSize}
          className="drop-shadow-sm"
        >
          <defs>
            <radialGradient id="cookie-paw-fill" cx="0.45" cy="0.25" r="0.8">
              <stop offset="0" stopColor="#fff5f2" />
              <stop offset="0.55" stopColor="#f0e0da" />
              <stop offset="1" stopColor="#d4b8ae" />
            </radialGradient>
          </defs>
          <ellipse
            cx="30"
            cy="32"
            rx="24"
            ry="26"
            fill="url(#cookie-paw-fill)"
            stroke="#c9a99e"
            strokeWidth="4"
          />
          <ellipse
            cx="18"
            cy="28"
            rx="3.5"
            ry="4.5"
            fill="#c9a99e"
            opacity="0.35"
          />
          <ellipse
            cx="30"
            cy="32"
            rx="3.5"
            ry="4.5"
            fill="#c9a99e"
            opacity="0.35"
          />
          <ellipse
            cx="42"
            cy="28"
            rx="3.5"
            ry="4.5"
            fill="#c9a99e"
            opacity="0.35"
          />
          <ellipse
            cx="22"
            cy="22"
            rx="6"
            ry="8"
            fill="#ffffff"
            opacity="0.55"
            transform="rotate(-18 22 22)"
          />
        </svg>
      </motion.div>
    </>
  )
}

export function CookieConsent({ className }: CookieConsentProps) {
  const layout = useConsentLayout()
  const containerRef = useRef<HTMLDivElement>(null)
  const rabbitRef = useRef<HTMLDivElement>(null)
  const cookieRef = useRef<HTMLDivElement>(null)
  const geometryRef = useRef<ReachGeometry | null>(null)
  const runIdRef = useRef(0)

  const pawX = useMotionValue(0)
  const pawY = useMotionValue(0)
  const pawScale = useMotionValue(1)
  const armOpacity = useMotionValue(0)
  const cookieX = useMotionValue(0)
  const cookieY = useMotionValue(0)
  const cookieScale = useMotionValue(1)
  const cookieOpacity = useMotionValue(1)
  const rabbitLean = useMotionValue(0)

  const [isVisible, setIsVisible] = useState(false)
  const [mood, setMood] = useState<RabbitMood>("neutral")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isReaching, setIsReaching] = useState(false)
  const [armGeometry, setArmGeometry] = useState<ReachGeometry | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    if (!stored) setIsVisible(true)
  }, [])

  const captureGeometry = useCallback(() => {
    const container = containerRef.current
    const rabbit = rabbitRef.current
    const cookie = cookieRef.current
    if (!container || !rabbit || !cookie) return null

    const containerRect = container.getBoundingClientRect()
    const rabbitRect = rabbit.getBoundingClientRect()
    const cookieRect = cookie.getBoundingClientRect()

    const geometry: ReachGeometry = {
      from: {
        x: rabbitRect.left + rabbitRect.width * 0.84 - containerRect.left,
        y: rabbitRect.top + rabbitRect.height * 0.56 - containerRect.top,
      },
      cookie: {
        x: cookieRect.left + cookieRect.width / 2 - containerRect.left,
        y: cookieRect.top + cookieRect.height / 2 - containerRect.top,
      },
      mouth: {
        x: rabbitRect.left + rabbitRect.width * 0.52 - containerRect.left,
        y: rabbitRect.top + rabbitRect.height * 0.38 - containerRect.top,
      },
    }

    geometryRef.current = geometry
    setArmGeometry(geometry)
    return geometry
  }, [])

  useEffect(() => {
    if (!isVisible || isAnimating) return

    function handleResize() {
      captureGeometry()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [captureGeometry, isAnimating, isVisible])

  const prepareMotion = useCallback(
    (geometry: ReachGeometry) => {
      pawX.set(geometry.from.x)
      pawY.set(geometry.from.y)
      pawScale.set(1)
      cookieX.set(0)
      cookieY.set(0)
      cookieScale.set(1)
      cookieOpacity.set(1)
      rabbitLean.set(0)
    },
    [
      cookieOpacity,
      cookieScale,
      cookieX,
      cookieY,
      pawScale,
      pawX,
      pawY,
      rabbitLean,
    ]
  )

  async function beginSequence() {
    await waitFrames(2)
    const geometry = captureGeometry()
    if (!geometry) return null

    prepareMotion(geometry)
    setIsAnimating(true)
    setIsReaching(true)

    await animate(rabbitLean, -1.5, { duration: 0.14, ease: ANIM.ease.soft })
    await animate(rabbitLean, 0, { duration: 0.2, ease: EASE_REACH })
    await animate(armOpacity, 1, {
      duration: ANIM.armFadeInMs / 1000,
      ease: EASE_REACH,
    })

    return geometry
  }

  async function reachToCookie(geometry: ReachGeometry) {
    await animateAlongBezier({
      from: geometry.from,
      to: geometry.cookie,
      duration: durationForDistance(
        geometry.from,
        geometry.cookie,
        ANIM.reachMinMs,
        ANIM.reachMaxMs
      ),
      ease: EASE_REACH,
      onUpdate: (point) => {
        pawX.set(point.x)
        pawY.set(point.y)
      },
    })
  }

  async function retractArm(from: Point, to: Point) {
    await animateAlongBezier({
      from,
      to,
      duration: ANIM.retractMs,
      ease: EASE_REACH,
      onUpdate: (point) => {
        pawX.set(point.x)
        pawY.set(point.y)
      },
    })
  }

  async function playAcceptSequence() {
    const runId = ++runIdRef.current
    const geometry = await beginSequence()
    if (!geometry || runId !== runIdRef.current) return

    await reachToCookie(geometry)
    if (runId !== runIdRef.current) return

    await waitMs(ANIM.grabHoldMs)

    await Promise.all([
      animate(pawScale, 1.08, { duration: 0.16, ease: EASE_PULL }),
      animate(cookieScale, 0.94, { duration: 0.16, ease: EASE_PULL }),
      animate(rabbitLean, 2.5, { duration: 0.22, ease: EASE_PULL }),
    ])
    if (runId !== runIdRef.current) return

    await animateAlongBezier({
      from: geometry.cookie,
      to: geometry.mouth,
      duration: durationForDistance(
        geometry.cookie,
        geometry.mouth,
        ANIM.pullMinMs,
        ANIM.pullMaxMs
      ),
      ease: EASE_PULL,
      onUpdate: (point) => {
        pawX.set(point.x)
        pawY.set(point.y)
        cookieX.set(point.x - geometry.cookie.x)
        cookieY.set(point.y - geometry.cookie.y)
      },
    })
    if (runId !== runIdRef.current) return

    await waitMs(80)

    await Promise.all([
      animate(cookieScale, 0.15, {
        duration: ANIM.eatMs / 1000,
        ease: EASE_PULL,
      }),
      animate(cookieOpacity, 0, {
        duration: ANIM.eatMs / 1000,
        ease: EASE_PULL,
      }),
      animate(pawScale, 1, { duration: 0.22, ease: EASE_PULL }),
      animate(rabbitLean, 0, { duration: 0.28, ease: EASE_PULL }),
    ])
    if (runId !== runIdRef.current) return

    setMood("happy")

    await retractArm(geometry.mouth, geometry.from)
    if (runId !== runIdRef.current) return

    await animate(armOpacity, 0, {
      duration: ANIM.armFadeOutMs / 1000,
      ease: EASE_PULL,
    })
    setIsReaching(false)
    setIsAnimating(false)

    window.localStorage.setItem(CONSENT_KEY, "accepted")
    await waitMs(650)
    if (runId !== runIdRef.current) return

    setIsVisible(false)
  }

  async function playDeclineSequence() {
    const runId = ++runIdRef.current
    const geometry = await beginSequence()
    if (!geometry || runId !== runIdRef.current) return

    await reachToCookie(geometry)
    if (runId !== runIdRef.current) return

    await waitMs(ANIM.grabHoldMs)

    await Promise.all([
      animate(pawScale, 1.06, { duration: 0.14, ease: EASE_PULL }),
      animate(cookieScale, 0.96, { duration: 0.14, ease: EASE_PULL }),
    ])
    if (runId !== runIdRef.current) return

    await Promise.all([
      animate(cookieScale, 0.6, {
        duration: ANIM.declineFadeMs / 1000,
        ease: EASE_PULL,
      }),
      animate(cookieOpacity, 0, {
        duration: ANIM.declineFadeMs / 1000,
        ease: EASE_PULL,
      }),
      animate(cookieY, -12, {
        duration: ANIM.declineFadeMs / 1000,
        ease: EASE_PULL,
      }),
      animate(pawScale, 0.96, { duration: 0.24, ease: EASE_PULL }),
    ])
    if (runId !== runIdRef.current) return

    setMood("sad")

    await retractArm(geometry.cookie, geometry.from)
    if (runId !== runIdRef.current) return

    await animate(armOpacity, 0, {
      duration: ANIM.armFadeOutMs / 1000,
      ease: EASE_PULL,
    })
    setIsReaching(false)
    setIsAnimating(false)

    window.localStorage.setItem(CONSENT_KEY, "declined")
    await waitMs(800)
    if (runId !== runIdRef.current) return

    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_REACH }}
          className={cn(
            "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-start",
            "px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
            "sm:bottom-6 sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            className
          )}
        >
          <div
            ref={containerRef}
            className="pointer-events-auto relative w-full max-w-[calc(100vw-1.5rem)] overflow-visible sm:max-w-sm md:max-w-md lg:max-w-[26rem]"
          >
            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-0 w-[7.25rem] -translate-y-[58%] overflow-visible sm:w-[8.5rem] sm:-translate-y-[60%] md:w-[9rem] md:-translate-y-[62%] lg:w-[9.5rem]"
              animate={isAnimating ? undefined : { y: [0, -4, 0] }}
              transition={
                isAnimating
                  ? undefined
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <motion.div
                ref={rabbitRef}
                style={{ rotate: rabbitLean, transformOrigin: "50% 100%" }}
              >
                <RabbitMascot
                  mood={mood}
                  size={layout.rabbitSize}
                  blink={!isAnimating}
                  armReach={isReaching}
                  className="drop-shadow-sm"
                />
              </motion.div>
            </motion.div>

            <div className="border-border/80 bg-card/95 relative z-10 overflow-visible rounded-xl border p-3 pl-[5rem] shadow-2xl backdrop-blur-md sm:p-4 sm:pl-[6.25rem] md:p-5 md:pl-[4rem]">
              <h2 className="text-sm font-semibold tracking-tight sm:text-base md:text-lg">
                A cookie situation
              </h2>

              <div className="mt-1.5 flex items-start gap-2 sm:mt-2 sm:gap-2.5">
                <p className="text-muted-foreground min-w-0 flex-1 text-[11px] leading-relaxed sm:text-xs md:text-sm">
                  One anonymous cookie counts visits and component views. No ad
                  tracking, ever.
                </p>

                <motion.div
                  className="shrink-0"
                  animate={
                    isAnimating
                      ? undefined
                      : { y: [0, -3, 0], rotate: [0, 1.5, 0, -1.5, 0] }
                  }
                  transition={
                    isAnimating
                      ? undefined
                      : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <motion.div
                    ref={cookieRef}
                    className="relative"
                    style={{
                      x: cookieX,
                      y: cookieY,
                      scale: cookieScale,
                      opacity: cookieOpacity,
                    }}
                  >
                    <CookieIcon className="size-9 sm:size-11 md:size-12" />
                    <span className="bg-foreground/10 absolute -bottom-1 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded-full opacity-35 blur-[1px] sm:w-8" />
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:mt-3.5 sm:flex-row sm:flex-wrap sm:gap-1.5">
                <Button
                  type="button"
                  disabled={isAnimating}
                  size="sm"
                  className="h-8 w-full rounded-full px-3.5 text-xs sm:w-auto"
                  onClick={playAcceptSequence}
                >
                  Share the cookie
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isAnimating}
                  size="sm"
                  className="h-8 w-full rounded-full px-3.5 text-xs sm:w-auto"
                  onClick={playDeclineSequence}
                >
                  No cookies
                </Button>
              </div>
            </div>

            {armGeometry ? (
              <ReachArm
                geometry={armGeometry}
                pawX={pawX}
                pawY={pawY}
                pawScale={pawScale}
                opacity={armOpacity}
                pawSize={layout.pawSize}
                armStroke={layout.armStroke}
              />
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
