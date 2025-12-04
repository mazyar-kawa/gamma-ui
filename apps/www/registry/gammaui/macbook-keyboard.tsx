"use client"

import React, { memo, useEffect, useState } from "react"
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  CommandIcon,
  DotIcon,
  GlobeIcon,
  LayoutPanelLeft,
  MicIcon,
  MoonIcon,
  OptionIcon,
  PauseIcon,
  SearchIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SunDimIcon,
  SunIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
} from "lucide-react"
import { motion } from "motion/react"

import { cn } from "../lib/utils"

const iconSize = 12

type CustomKeyType = "FingerPrintKey" | "ArrowKeys"

interface IconKeyboardKeyProps {
  icon: string | React.ReactNode
  text?: string | React.ReactNode
  className?: string
  isSingleKey?: boolean
  custom?: CustomKeyType
  index?: number
  rowIndex?: number
  isLastRow?: boolean
  keySize?: number
  transparentKey?: boolean
  glowColor?: string
  pressedKey: string | null
}

interface MacBookKeyboardSvgProps {
  transparentKey?: boolean
  keySize?: number
  glowColor?: string
}

type KeyRowDataProps = Omit<IconKeyboardKeyProps, "pressedKey">

const keyMap: Record<string, string> = {
  Escape: "esc",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  "`": "`",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
  "-": "-",
  "=": "=",
  Backspace: "delete",
  Tab: "tab",
  q: "Q",
  w: "W",
  e: "E",
  r: "R",
  t: "T",
  y: "Y",
  u: "U",
  i: "I",
  o: "O",
  p: "P",
  "[": "[",
  "]": "]",
  "\\": "/",
  CapsLock: "caps lock",
  a: "A",
  s: "S",
  d: "D",
  f: "F",
  g: "G",
  h: "H",
  j: "J",
  k: "K",
  l: "L",
  ";": ";",
  "'": "'",
  Enter: "return",
  Shift: "shift",
  z: "Z",
  x: "X",
  c: "C",
  v: "V",
  b: "B",
  n: "N",
  m: "M",
  ",": ",",
  ".": ".",
  "/": "/",
  Control: "control",
  Alt: "option",
  Meta: "command",
  " ": "",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
}

const MacBookKeyboard = memo(
  ({
    transparentKey = true,
    keySize = 40,
    glowColor = "#f43f5d",
  }: MacBookKeyboardSvgProps) => {
    const [pressedKey, setPressedKey] = useState<string | null>(null)

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const mappedKey = keyMap[event.key]
        if (mappedKey !== undefined) {
          setPressedKey(mappedKey)
        }
      }

      const handleKeyUp = () => {
        setPressedKey(null)
      }

      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)

      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }, [])

    return (
      <div className="card-color flex w-full flex-col gap-1 rounded-[3px] p-2">
        {keysData.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex flex-row gap-1">
              {row.map((item, index) => {
                if (item.custom === "FingerPrintKey") {
                  return (
                    <FingerPrintKey
                      key={index}
                      index={index}
                      rowIndex={rowIndex}
                      keySize={keySize}
                      transparentKey={transparentKey}
                    />
                  )
                }

                if (item.custom === "ArrowKeys") {
                  return (
                    <ArrowKeys
                      key={index}
                      index={index}
                      rowIndex={rowIndex}
                      pressedKey={pressedKey}
                      glowColor={glowColor}
                    />
                  )
                }

                return (
                  <IconKeyboardKey
                    key={index}
                    index={index}
                    rowIndex={rowIndex}
                    text={item.text}
                    icon={item.icon}
                    className={item.className}
                    isSingleKey={item.isSingleKey}
                    isLastRow={rowIndex === keysData.length - 1}
                    keySize={keySize}
                    transparentKey={transparentKey}
                    glowColor={glowColor}
                    pressedKey={pressedKey}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
)

MacBookKeyboard.displayName = "MacBookKeyboard"

const IconKeyboardKey = memo(
  ({
    icon,
    text,
    className,
    isSingleKey,
    index = 0,
    rowIndex = 0,
    isLastRow,
    keySize,
    transparentKey,
    glowColor,
    pressedKey,
  }: IconKeyboardKeyProps) => {
    const isText = typeof text === "string"
    const shouldGlow = isText && pressedKey === text

    return (
      <motion.div
        variants={{
          initial: { borderColor: "#212121" },
          animate: {
            borderColor: ["#212121", "#383838", "#212121"],
          },
        }}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: index * 0.1 + rowIndex * 0.12,
        }}
        style={{
          width: `${keySize}px`,
          height: `${keySize}px`,
          minWidth: `${keySize}px`,
          flexBasis: `${keySize}px`,
          color: shouldGlow ? `${glowColor}50` : "#212121",
        }}
        className={cn(
          className,
          shouldGlow && "animate-[6000ms]",
          "group border-border/80 relative flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-x border-t-[1.5px] border-b-[0.1px] px-2 shadow-[inset_0px_0px_15px_rgba(0,0,0,0.2)] duration-200 select-none first:items-start last:items-end active:scale-[0.98]!",
          transparentKey ? "bg-transparent" : "bg-[#121214]"
        )}
      >
        {!isSingleKey && (
          <div className="text-muted-foreground/70 group-hover:text-muted-foreground mt-0.5 h-[10px] w-[10px] text-center text-xs font-light duration-200">
            {icon}
          </div>
        )}
        <div
          style={{
            color: shouldGlow ? glowColor : "",
            textShadow: shouldGlow ? `0 0 10px ${glowColor}` : "",
          }}
          className={cn(
            isLastRow && "text-[8px]!",
            isSingleKey ? "text-sm" : "text-xs",
            "dark:text-muted-foreground/70 text-center text-white duration-200 group-hover:text-white/60"
          )}
        >
          {text}
        </div>
      </motion.div>
    )
  }
)

IconKeyboardKey.displayName = "IconKeyboardKey"

const FingerPrintKey = memo(
  ({
    index,
    rowIndex,
    keySize,
    transparentKey,
  }: {
    index: number
    rowIndex: number
    keySize: number
    transparentKey: boolean
  }) => {
    return (
      <motion.div
        variants={{
          initial: { borderColor: "#212121" },
          animate: {
            borderColor: ["#212121", "#383838", "#212121"],
          },
        }}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: index * 0.1 + rowIndex * 0.12,
        }}
        style={{
          width: `${keySize}px`,
          height: `${keySize}px`,
          minWidth: `${keySize}px`,
        }}
        className={cn(
          "group border-border/80 relative flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-x border-t-[1.5px] border-b-[0.1px] shadow-[inset_0px_0px_15px_rgba(0,0,0,0.2)] duration-200",
          transparentKey ? "bg-transparent" : "bg-[#121214]"
        )}
      >
        <div className="bg-muted/20 group-hover:bg-muted/35 h-8 w-8 rounded-full shadow-[inset_0px_0px_2px_rgba(0,0,0,0.6)] duration-200" />
      </motion.div>
    )
  }
)

FingerPrintKey.displayName = "FingerPrintKey"

const ArrowKeys = memo(
  ({
    index,
    rowIndex,
    pressedKey,
    glowColor,
  }: {
    index: number
    rowIndex: number
    pressedKey: string | null
    glowColor: string
  }) => {
    return (
      <div className="flex flex-row gap-1">
        <ArrowKey
          index={index}
          rowIndex={rowIndex}
          icon={<ArrowLeftIcon size={iconSize} />}
          keyName="ArrowLeft"
          pressedKey={pressedKey}
          glowColor={glowColor}
          className="h-1/2! translate-y-5 items-center!"
        />
        <div className="flex h-10 flex-col">
          <ArrowKey
            index={index}
            rowIndex={rowIndex}
            icon={<ArrowUpIcon size={iconSize} />}
            keyName="ArrowUp"
            pressedKey={pressedKey}
            glowColor={glowColor}
            className="h-1/2! items-center! rounded-b-none!"
          />
          <ArrowKey
            index={index}
            rowIndex={rowIndex}
            icon={<ArrowDownIcon size={iconSize} />}
            keyName="ArrowDown"
            pressedKey={pressedKey}
            glowColor={glowColor}
            className="h-1/2! items-center! rounded-t-none!"
          />
        </div>
        <ArrowKey
          index={index}
          rowIndex={rowIndex}
          icon={<ArrowRightIcon size={iconSize} />}
          keyName="ArrowRight"
          pressedKey={pressedKey}
          glowColor={glowColor}
          className="h-1/2! translate-y-5 items-center!"
        />
      </div>
    )
  }
)

ArrowKeys.displayName = "ArrowKeys"

const ArrowKey = memo(
  ({
    index,
    rowIndex,
    icon,
    keyName,
    pressedKey,
    glowColor,
    className,
  }: {
    index: number
    rowIndex: number
    icon: React.ReactNode
    keyName: string
    pressedKey: string | null
    glowColor: string
    className?: string
  }) => {
    const shouldGlow = pressedKey === keyName

    return (
      <motion.div
        variants={{
          initial: { borderColor: "#212121" },
          animate: {
            borderColor: ["#212121", "#383838", "#212121"],
          },
        }}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: index * 0.1 + rowIndex * 0.12,
        }}
        className={cn(
          className,
          "group border-border/80 relative flex flex-col items-center justify-center gap-1.5 rounded-[3px] border border-x border-t-[1.5px] border-b-[0.1px] bg-transparent px-2 shadow-[inset_0px_0px_15px_rgba(0,0,0,0.2)] duration-200 select-none"
        )}
      >
        <div
          style={{
            color: shouldGlow ? glowColor : "",
            filter: shouldGlow ? `drop-shadow(0 0 8px ${glowColor})` : "",
          }}
          className="text-muted-foreground/70 text-center duration-200"
        >
          {icon}
        </div>
      </motion.div>
    )
  }
)

ArrowKey.displayName = "ArrowKey"

export { MacBookKeyboard }

const firstRowData: KeyRowDataProps[] = [
  {
    icon: null,
    text: "esc",
    className: "!basis-full",
  },
  {
    icon: <SunDimIcon size={iconSize} />,
    text: "F1",
  },
  {
    icon: <SunIcon size={iconSize} />,
    text: "F2",
  },
  {
    icon: <LayoutPanelLeft size={iconSize} />,
    text: "F3",
  },
  {
    icon: <SearchIcon size={iconSize} />,
    text: "F4",
  },
  {
    icon: <MicIcon size={iconSize} />,
    text: "F5",
  },
  {
    icon: <MoonIcon size={iconSize} />,
    text: "F6",
  },
  {
    icon: <SkipBackIcon size={iconSize} />,
    text: "F7",
  },
  {
    icon: <PauseIcon size={iconSize} />,
    text: "F8",
  },
  {
    icon: <SkipForwardIcon size={iconSize} />,
    text: "F9",
  },
  {
    icon: <VolumeIcon size={iconSize} />,
    text: "F10",
  },
  {
    icon: <Volume1Icon size={iconSize} />,
    text: "F11",
  },
  {
    icon: <Volume2Icon size={iconSize} />,
    text: "F12",
  },
  {
    custom: "FingerPrintKey",
    icon: null,
  },
]

const secondRowData: KeyRowDataProps[] = [
  {
    icon: "~",
    text: "`",
    className: "first:!items-center",
  },
  {
    icon: "!",
    text: "1",
  },
  {
    icon: "@",
    text: "2",
  },
  {
    icon: "#",
    text: "3",
  },
  {
    icon: "$",
    text: "4",
  },
  {
    icon: "%",
    text: "5",
  },
  {
    icon: "^",
    text: "6",
  },
  {
    icon: "&",
    text: "7",
  },
  {
    icon: "*",
    text: "8",
  },
  {
    icon: "(",
    text: "9",
  },
  {
    icon: ")",
    text: "0",
  },
  {
    icon: "_",
    text: "-",
  },
  {
    icon: "+",
    text: "=",
  },
  {
    icon: null,
    text: "delete",
    className: "!basis-full",
  },
]

const thirdRowData: KeyRowDataProps[] = [
  {
    icon: null,
    text: "tab",
    className: "!basis-full",
  },
  {
    icon: "q",
    text: "Q",
    isSingleKey: true,
  },
  {
    icon: "w",
    text: "W",
    isSingleKey: true,
  },
  {
    icon: "e",
    text: "E",
    isSingleKey: true,
  },
  {
    icon: "r",
    text: "R",
    isSingleKey: true,
  },
  {
    icon: "t",
    text: "T",
    isSingleKey: true,
  },
  {
    icon: "y",
    text: "Y",
    isSingleKey: true,
  },
  {
    icon: "u",
    text: "U",
    isSingleKey: true,
  },
  {
    icon: "i",
    text: "I",
    isSingleKey: true,
  },
  {
    icon: "o",
    text: "O",
    isSingleKey: true,
  },
  {
    icon: "p",
    text: "P",
    isSingleKey: true,
  },
  {
    icon: "{",
    text: "[",
  },
  {
    icon: "}",
    text: "]",
  },
  {
    icon: "|",
    text: "/",
    className: "last:!items-center",
  },
]

const fourthRowData: KeyRowDataProps[] = [
  {
    icon: <DotIcon size={iconSize + 3} className="-mt-0.5 -ml-1.5" />,
    text: "caps lock",
    className: "!basis-full",
  },
  {
    icon: "a",
    text: "A",
    isSingleKey: true,
  },
  {
    icon: "s",
    text: "S",
    isSingleKey: true,
  },
  {
    icon: "d",
    text: "D",
    isSingleKey: true,
  },
  {
    icon: "f",
    text: "F",
    isSingleKey: true,
  },
  {
    icon: "g",
    text: "G",
    isSingleKey: true,
  },
  {
    icon: "h",
    text: "H",
    isSingleKey: true,
  },
  {
    icon: "j",
    text: "J",
    isSingleKey: true,
  },
  {
    icon: "k",
    text: "K",
    isSingleKey: true,
  },
  {
    icon: "l",
    text: "L",
    isSingleKey: true,
  },
  {
    icon: ":",
    text: ";",
  },
  {
    icon: '"',
    text: "'",
  },
  {
    icon: null,
    text: "return",
    className: "!basis-full",
  },
]

const fifthRowData: KeyRowDataProps[] = [
  {
    icon: null,
    text: "shift",
    className: "!basis-full",
  },
  {
    icon: "z",
    text: "Z",
    isSingleKey: true,
  },
  {
    icon: "x",
    text: "X",
    isSingleKey: true,
  },
  {
    icon: "c",
    text: "C",
    isSingleKey: true,
  },
  {
    icon: "v",
    text: "V",
    isSingleKey: true,
  },
  {
    icon: "b",
    text: "B",
    isSingleKey: true,
  },
  {
    icon: "n",
    text: "N",
    isSingleKey: true,
  },
  {
    icon: "m",
    text: "M",
    isSingleKey: true,
  },
  {
    icon: "<",
    text: ",",
  },
  {
    icon: ">",
    text: ".",
  },
  {
    icon: "?",
    text: "/",
  },
  {
    icon: null,
    text: "shift",
    className: "!basis-full",
  },
]

const sixthRowData: KeyRowDataProps[] = [
  {
    icon: "fn",
    text: <GlobeIcon size={iconSize} />,
  },
  {
    icon: <ChevronUpIcon size={iconSize} />,
    text: "control",
    className: "!items-end",
  },
  {
    icon: <OptionIcon size={iconSize} />,
    text: "option",
    className: "!items-end",
  },
  {
    icon: <CommandIcon size={iconSize} />,
    text: "command",
    className: "!items-end !basis-20",
  },
  {
    icon: null,
    text: "",
    className: "!basis-80",
  },
  {
    icon: <CommandIcon size={iconSize} />,
    text: "command",
    className: "!items-start !basis-20",
  },
  {
    icon: <OptionIcon size={iconSize} />,
    text: "option",
    className: "!items-start",
  },
  {
    icon: null,
    custom: "ArrowKeys",
  },
]

const keysData = [
  firstRowData,
  secondRowData,
  thirdRowData,
  fourthRowData,
  fifthRowData,
  sixthRowData,
]
