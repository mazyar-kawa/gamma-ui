"use client"

import React from "react"
import NumberFlow from "@number-flow/react"

export default function PricingInteraction() {
  const [active, setActive] = React.useState(0)
  const [period, setPeriod] = React.useState(0)
  const handleChangePlan = (index: number) => {
    setActive(index)
  }
  const handleChangePeriod = (index: number) => {
    setPeriod(index)
    if (index === 0) {
      setStarter(9.99)
      setPro(19.99)
    } else {
      setStarter(7.49)
      setPro(17.49)
    }
  }
  const [starter, setStarter] = React.useState(9.99)
  const [pro, setPro] = React.useState(19.99)
  return (
    <main className="relative flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-4xl border-2 p-3 shadow-md">
        <div className="relative flex w-full items-center rounded-full bg-slate-100 p-1.5 dark:bg-zinc-900">
          <button
            className="z-20 w-full rounded-full p-1.5 font-semibold text-slate-800 dark:text-white"
            onClick={() => handleChangePeriod(0)}
          >
            Monthly
          </button>
          <button
            className="z-20 w-full rounded-full p-1.5 font-semibold text-slate-800 dark:text-white"
            onClick={() => handleChangePeriod(1)}
          >
            Yearly
          </button>
          <div
            className="items-cnter absolute inset-0 z-10 flex w-1/2 justify-center p-1.5"
            style={{
              transform: `translateX(${period * 100}%)`,
              transition: "transform 0.3s",
            }}
          >
            <div className="h-full w-full rounded-full bg-white shadow-sm dark:bg-black" />
          </div>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center gap-3">
          <div
            className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
            onClick={() => handleChangePlan(0)}
          >
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold text-black dark:text-white">
                Free
              </p>
              <p className="text-md text-slate-500 dark:text-zinc-600">
                <span className="font-medium text-black dark:text-white">
                  $0.00
                </span>
                /month
              </p>
            </div>
            <div
              className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
              style={{
                borderColor: `${active === 0 ? "#000" : "#64748b"}`,
                transition: "border-color 0.3s",
              }}
            >
              <div
                className="bg-primary size-3 rounded-full"
                style={{
                  opacity: `${active === 0 ? 1 : 0}`,
                  transition: "opacity 0.3s",
                }}
              ></div>
            </div>
          </div>
          <div
            className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
            onClick={() => handleChangePlan(1)}
          >
            <div className="flex flex-col items-start">
              <p className="flex items-center gap-2 text-xl font-semibold text-black dark:text-white">
                Starter{" "}
                <span className="block rounded-lg bg-yellow-100 px-2 py-1 text-sm text-yellow-950">
                  Popular
                </span>
              </p>
              <p className="text-md flex text-slate-500 dark:text-zinc-600">
                <span className="flex items-center font-medium text-black dark:text-white">
                  $ <NumberFlow className="font-medium" value={starter} />
                </span>
                /month
              </p>
            </div>
            <div
              className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
              style={{
                borderColor: `${active === 1 ? "#000" : "#64748b"}`,
                transition: "border-color 0.3s",
              }}
            >
              <div
                className="bg-primary size-3 rounded-full"
                style={{
                  opacity: `${active === 1 ? 1 : 0}`,
                  transition: "opacity 0.3s",
                }}
              ></div>
            </div>
          </div>
          <div
            className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
            onClick={() => handleChangePlan(2)}
          >
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold text-black dark:text-white">
                Pro
              </p>
              <p className="text-md flex text-slate-500 dark:text-zinc-600">
                <span className="flex items-center font-medium text-black dark:text-white">
                  $ <NumberFlow className="font-medium" value={pro} />
                </span>
                /month
              </p>
            </div>
            <div
              className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
              style={{
                borderColor: `${active === 2 ? "#000" : "#64748b"}`,
                transition: "border-color 0.3s",
              }}
            >
              <div
                className="bg-primary size-3 rounded-full"
                style={{
                  opacity: `${active === 2 ? 1 : 0}`,
                  transition: "opacity 0.3s",
                }}
              ></div>
            </div>
          </div>
          <div
            className={`absolute top-0 h-[88px] w-full rounded-2xl border-[3px] border-black dark:border-zinc-700`}
            style={{
              transform: `translateY(${active * 88 + 12 * active}px)`,
              transition: "transform 0.3s",
            }}
          ></div>
        </div>
        <button className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95 dark:bg-zinc-900">
          Get Started
        </button>
      </div>
    </main>
  )
}
