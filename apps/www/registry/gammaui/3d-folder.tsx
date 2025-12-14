"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type React from "react"
import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconX,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

interface Project {
  id: string
  image: string
  title: string
}

interface AnimatedFolderProps {
  title: string
  projects: Project[]
  className?: string
}

export function AnimatedFolder({
  title,
  projects,
  className,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleProjectClick = (project: Project, index: number) => {
    const cardEl = cardRefs.current[index]
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect())
    }
    setSelectedIndex(index)
    setHiddenCardId(project.id)
  }

  const handleCloseLightbox = () => {
    setSelectedIndex(null)
    setSourceRect(null)
  }

  const handleCloseComplete = () => {
    setHiddenCardId(null)
  }

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex)
    setHiddenCardId(projects[newIndex]?.id || null)
  }

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "cursor-pointer rounded-2xl p-8",
          "bg-card border-border border",
          "transition-all duration-500 ease-out",
          "hover:shadow-accent/10 hover:shadow-2xl",
          "hover:border-orange-400/30",
          "group",
          className
        )}
        style={{
          minWidth: "280px",
          minHeight: "320px",
          perspective: "1000px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)",
            opacity: isHovered ? 0.08 : 0,
          }}
        />

        <div
          className="relative mb-4 flex items-center justify-center"
          style={{ height: "160px", width: "200px" }}
        >
          {/* Folder back layer - z-index 10 */}
          <div
            className="absolute h-24 w-32 rounded-[10px] bg-[#E48C57] shadow-md"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className="absolute h-4 w-12 rounded-t-[10px] bg-[#B36B51]"
            style={{
              top: "calc(50% - 48px - 12px)",
              left: "calc(50% - 64px + 16px)",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(-25deg) translateY(-2px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Project cards - z-index 20, between back and front */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className="absolute h-24 w-32 rounded-[10px] bg-[#E48C57] shadow-lg"
            style={{
              top: "calc(50% - 48px + 4px)",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(25deg) translateY(8px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />

          {/* Folder shine effect - z-index 31 */}
          <div
            className="pointer-events-none absolute h-24 w-32 overflow-hidden rounded-lg"
            style={{
              top: "calc(50% - 48px + 4px)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(25deg) translateY(8px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Folder title */}
        <h3
          className="text-foreground mt-4 text-lg font-semibold transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {title}
        </h3>

        {/* Project count */}
        <p
          className="text-muted-foreground text-sm transition-all duration-300"
          style={{
            opacity: isHovered ? 0.7 : 1,
          }}
        >
          {projects.length} projects
        </p>

        {/* Hover hint */}
        <div
          className="text-muted-foreground absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
          <span>Hover to explore</span>
        </div>
      </div>

      <ImageLightbox
        projects={projects.slice(0, 3)}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  )
}

interface Project {
  id: string
  image: string
  title: string
}

interface ImageLightboxProps {
  projects: Project[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  sourceRect: DOMRect | null
  onCloseComplete?: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "animating" | "complete"
  >("initial")
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  const [prevIndex, setPrevIndex] = useState(currentIndex)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length
  const hasNext = internalIndex < totalProjects - 1
  const hasPrev = internalIndex > 0

  const currentProject = projects[internalIndex]

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? "left" : "right"
      setSlideDirection(direction)
      setPrevIndex(internalIndex)
      setIsSliding(true)

      const timer = setTimeout(() => {
        setInternalIndex(currentIndex)
        setIsSliding(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, isOpen])

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex)
      setPrevIndex(currentIndex)
      setIsSliding(false)
    }
  }, [isOpen])

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return
    onNavigate(internalIndex + 1)
  }, [internalIndex, totalProjects, isSliding, onNavigate])

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return
    onNavigate(internalIndex - 1)
  }, [internalIndex, isSliding, onNavigate])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    onClose()
    setTimeout(() => {
      setIsClosing(false)
      setShouldRender(false)
      setAnimationPhase("initial")
      onCloseComplete?.()
    }, 400)
  }, [onClose, onCloseComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") navigateNext()
      if (e.key === "ArrowLeft") navigatePrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleClose, navigateNext, navigatePrev])

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true)
      setAnimationPhase("initial")
      setIsClosing(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase("animating")
        })
      })
      const timer = setTimeout(() => {
        setAnimationPhase("complete")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, sourceRect])

  const handleDotClick = (idx: number) => {
    if (isSliding || idx === internalIndex) return
    onNavigate(idx)
  }

  if (!shouldRender || !currentProject) return null

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {}

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const targetWidth = Math.min(768, viewportWidth - 64)
    const targetHeight = Math.min(viewportHeight * 0.85, 600)

    const targetX = (viewportWidth - targetWidth) / 2
    const targetY = (viewportHeight - targetHeight) / 2

    const scaleX = sourceRect.width / targetWidth
    const scaleY = sourceRect.height / targetHeight
    const scale = Math.max(scaleX, scaleY)

    const translateX =
      sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2)
    const translateY =
      sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2)

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    }
  }

  const getFinalStyles = (): React.CSSProperties => {
    return {
      transform: "translate(0, 0) scale(1)",
      opacity: 1,
    }
  }

  const currentStyles =
    animationPhase === "initial" && !isClosing
      ? getInitialStyles()
      : getFinalStyles()

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      )}
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="bg-background/80 absolute inset-0 backdrop-blur-xl"
        style={{
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className={cn(
          "absolute top-5 right-5 z-50",
          "flex h-10 w-10 items-center justify-center",
          "bg-muted/50 rounded-full backdrop-blur-md",
          "border-border border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-105 active:scale-95"
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing
              ? "translateY(0)"
              : "translateY(-10px)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <IconX className="h-4 w-4" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigatePrev()
        }}
        disabled={!hasPrev || isSliding}
        className={cn(
          "absolute left-4 z-50 md:left-8",
          "flex h-12 w-12 items-center justify-center",
          "bg-muted/50 rounded-full backdrop-blur-md",
          "border-border border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
        style={{
          opacity:
            animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing
              ? "translateX(0)"
              : "translateX(-20px)",
          transition:
            "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <IconChevronLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigateNext()
        }}
        disabled={!hasNext || isSliding}
        className={cn(
          "absolute right-4 z-50 md:right-8",
          "flex h-12 w-12 items-center justify-center",
          "bg-muted/50 rounded-full backdrop-blur-md",
          "border-border border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
        style={{
          opacity:
            animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing
              ? "translateX(0)"
              : "translateX(20px)",
          transition:
            "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <IconChevronRight className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing
            ? "translate(0, 0) scale(0.95)"
            : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            "rounded-2xl",
            "bg-card",
            "ring-border ring-1",
            "shadow-2xl"
          )}
          style={{
            borderRadius:
              animationPhase === "initial" && !isClosing ? "8px" : "16px",
            transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding
                  ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)"
                  : "none",
              }}
            >
              {projects.map((project, idx) => (
                <img
                  key={project.id}
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="bg-background h-auto max-h-[70vh] w-full shrink-0 object-contain"
                  style={{ minWidth: "100%" }}
                />
              ))}
            </div>

            {/* Subtle vignette effect */}
            <div className="from-card/20 to-card/10 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent" />
          </div>

          <div
            className={cn("px-6 py-5", "bg-card", "border-border border-t")}
            style={{
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform:
                animationPhase === "complete" && !isClosing
                  ? "translateY(0)"
                  : "translateY(20px)",
              transition:
                "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground h-7 truncate text-lg font-medium tracking-tight">
                  {currentProject?.title}
                </h3>
                <div className="mt-1 flex items-center gap-3">
                  <p className="text-muted-foreground text-sm">
                    <kbd className="bg-muted text-muted-foreground border-border mx-0.5 rounded border px-1.5 py-0.5 text-xs font-medium">
                      ←
                    </kbd>
                    <kbd className="bg-muted text-muted-foreground border-border mx-0.5 rounded border px-1.5 py-0.5 text-xs font-medium">
                      →
                    </kbd>{" "}
                    to navigate
                  </p>
                  <div className="flex items-center gap-1.5">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          idx === internalIndex
                            ? "bg-foreground scale-110"
                            : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                className={cn(
                  "flex items-center gap-2 px-4 py-2",
                  "text-muted-foreground text-sm font-medium",
                  "bg-muted/50 hover:bg-muted",
                  "border-border rounded-lg border",
                  "transition-all duration-200 ease-out",
                  "hover:text-foreground"
                )}
              >
                <span>View</span>
                <IconExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  image: string
  title: string
  delay: number
  isVisible: boolean
  index: number
  onClick: () => void
  isSelected: boolean
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12]
    const translations = [-55, 0, 55]

    return (
      <div
        ref={ref}
        className={cn(
          "absolute h-28 w-20 overflow-hidden rounded-[8px] shadow-xl",
          "bg-card border-border border",
          "cursor-pointer hover:ring-2 hover:ring-orange-400/50",
          isSelected && "opacity-0"
        )}
        style={{
          transform: isVisible
            ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 10 - index,
          left: "-40px",
          top: "-56px",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="from-foreground/60 absolute inset-0 bg-linear-to-t to-transparent" />
        <p className="text-primary-foreground absolute right-1.5 bottom-1.5 left-1.5 truncate text-[10px] font-medium">
          {title}
        </p>
      </div>
    )
  }
)

ProjectCard.displayName = "ProjectCard"
