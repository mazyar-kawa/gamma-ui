import {
  getRabbitMoodLayers,
  type RabbitMood,
} from "@/registry/gammaui/rabbit-mascot-moods"

const BLINK_CLOSE_MS = 140
const BLINK_MIN_INTERVAL_MS = 2600
const BLINK_MAX_INTERVAL_MS = 5200

interface BlinkEyeState {
  left: boolean
  right: boolean
}

/** Moods where both round eyes stay open (not arcs, winks, or alternate face art). */
export function supportsRabbitBlink(mood: RabbitMood): boolean {
  const layers = getRabbitMoodLayers(mood)

  return (
    layers.leftDefaultEye === 1 &&
    layers.rightDefaultEye === 1 &&
    layers.leftHappyArc === 0 &&
    layers.rightHappyArc === 0 &&
    layers.shyFace === 0 &&
    layers.sideEye === 0 &&
    layers.passwordFace === 0 &&
    layers.leftWink === 0 &&
    layers.rightWink === 0
  )
}

function getBlinkEyeState(mood: RabbitMood): BlinkEyeState {
  if (!supportsRabbitBlink(mood)) return { left: false, right: false }
  return { left: true, right: true }
}

function setBlinkLayerOpacity(el: Element | null | undefined, opacity: number) {
  if (!el) return
  el.setAttribute("opacity", String(opacity))
}

export function triggerRabbitBlink(root: ParentNode | null, mood: RabbitMood) {
  if (!root || !supportsRabbitBlink(mood)) return

  const { left, right } = getBlinkEyeState(mood)
  if (!left && !right) return

  const blinkLids = root.querySelector("#blink-lids")
  const leftBlinkLid = root.querySelector("#left-blink-lid")
  const rightBlinkLid = root.querySelector("#right-blink-lid")
  const leftEye = root.querySelector("#left-eye")
  const rightEye = root.querySelector("#right-eye")
  const leftEyeContent = leftEye?.querySelector(":scope > g > g > g")
  const rightEyeContent = rightEye?.querySelector(":scope > g > g > g")
  const leftEyeStar = root.querySelector("#left-eye-star")
  const rightEyeStar = root.querySelector("#right-eye-star")
  const leftWantTwinkle = root.querySelector("#left-eye-want-twinkle")
  const rightWantTwinkle = root.querySelector("#right-eye-want-twinkle")

  setBlinkLayerOpacity(blinkLids, 1)
  setBlinkLayerOpacity(leftBlinkLid, 1)
  setBlinkLayerOpacity(rightBlinkLid, 1)
  setBlinkLayerOpacity(leftEyeContent, 0)
  setBlinkLayerOpacity(rightEyeContent, 0)
  setBlinkLayerOpacity(leftEyeStar, 0)
  setBlinkLayerOpacity(rightEyeStar, 0)
  setBlinkLayerOpacity(leftWantTwinkle, 0)
  setBlinkLayerOpacity(rightWantTwinkle, 0)

  window.setTimeout(() => {
    const layers = getRabbitMoodLayers(mood)

    setBlinkLayerOpacity(blinkLids, 0)
    setBlinkLayerOpacity(leftBlinkLid, 0)
    setBlinkLayerOpacity(rightBlinkLid, 0)
    setBlinkLayerOpacity(leftEyeContent, layers.leftDefaultEye)
    setBlinkLayerOpacity(rightEyeContent, layers.rightDefaultEye)
    setBlinkLayerOpacity(leftEyeStar, layers.leftEyeStar)
    setBlinkLayerOpacity(rightEyeStar, layers.rightEyeStar)
    setBlinkLayerOpacity(leftWantTwinkle, layers.leftWantTwinkle)
    setBlinkLayerOpacity(rightWantTwinkle, layers.rightWantTwinkle)
  }, BLINK_CLOSE_MS)
}

function randomBlinkDelayMs() {
  return (
    BLINK_MIN_INTERVAL_MS +
    Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS)
  )
}

export function startRabbitBlinkLoop(
  root: ParentNode | null,
  getMood: () => RabbitMood
) {
  if (!root) return () => {}

  let timeoutId = window.setTimeout(function scheduleBlink() {
    const mood = getMood()
    if (supportsRabbitBlink(mood)) triggerRabbitBlink(root, mood)
    timeoutId = window.setTimeout(scheduleBlink, randomBlinkDelayMs())
  }, randomBlinkDelayMs())

  return () => window.clearTimeout(timeoutId)
}
