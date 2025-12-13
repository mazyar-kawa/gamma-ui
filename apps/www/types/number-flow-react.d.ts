declare module "@number-flow/react" {
  import React from "react"

  export interface NumberFlowProps {
    value: number | string
    className?: string
  }

  const NumberFlow: React.FC<NumberFlowProps>

  export default NumberFlow
}
