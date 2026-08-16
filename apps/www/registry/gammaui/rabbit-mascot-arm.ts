function setOpacity(el: Element | null, opacity: number) {
  if (!el) return
  el.setAttribute("opacity", String(opacity))
}

export function applyRabbitArmReach(
  root: ParentNode | null,
  reaching: boolean
) {
  if (!root) return

  const rightArm = root.querySelector("#right-arm")
  const reachArm = root.querySelector("#right-arm-reach")

  if (rightArm instanceof SVGElement) {
    rightArm.style.transition = reaching ? "none" : "opacity 0.2s ease"
  }

  setOpacity(rightArm, reaching ? 0 : 1)
  setOpacity(reachArm, 0)
}
