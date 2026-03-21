"use client"

import { useEffect, useState } from "react"
import { IconCpu } from "@tabler/icons-react"

import UsageCard from "@/registry/gammaui/usage-card"

const UsageCardDemo = () => {
  const [cpuVal, setCpuVal] = useState(72)

  useEffect(() => {
    const id = setInterval(() => {
      setCpuVal((v) =>
        Math.min(100, Math.max(0, v + (Math.random() - 0.5) * 10))
      )
    }, 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="h-full">
      <UsageCard
        title="CPU"
        percentage={Math.round(cpuVal)}
        pillCount={20}
        accentColor="#00f5ff"
        icon={<IconCpu size={13} />}
      />
    </div>
  )
}

export default UsageCardDemo
