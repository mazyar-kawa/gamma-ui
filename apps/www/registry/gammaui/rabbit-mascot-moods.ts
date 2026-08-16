export const RABBIT_MOODS = [
  "neutral",
  "happy",
  "sad",
  "love",
  "winky",
  "surprised",
  "thinking",
  "side-eye",
  "shy",
] as const

export type RabbitMood = (typeof RABBIT_MOODS)[number]

export const RABBIT_MOOD_LABELS: Record<RabbitMood, string> = {
  neutral: "Neutral",
  happy: "Happy",
  sad: "Sad",
  love: "Love",
  winky: "Winky",
  surprised: "Surprised",
  thinking: "Thinking",
  "side-eye": "Side eye",
  shy: "Shy",
}

interface RabbitMoodLayers {
  leftDefaultEye: number
  rightDefaultEye: number
  defaultMouth: number
  sadMouth: number
  leftHappyArc: number
  rightHappyArc: number
  passwordFace: number
  shyFace: number
  sideEye: number
  hmmLids: number
  sadBrows: number
  happyOpenMouth: number
  mouthOh: number
  leftEyeStar: number
  rightEyeStar: number
  leftWantTwinkle: number
  rightWantTwinkle: number
  emotionFx: number
  sadTears: number
  happyTwinkle: number
  cheekOpacity: number
  leftWink: number
  rightWink: number
  spectacles: number
}

const NEUTRAL_LAYERS: RabbitMoodLayers = {
  leftDefaultEye: 1,
  rightDefaultEye: 1,
  defaultMouth: 1,
  sadMouth: 0,
  leftHappyArc: 0,
  rightHappyArc: 0,
  passwordFace: 0,
  shyFace: 0,
  sideEye: 0,
  hmmLids: 0,
  sadBrows: 0,
  happyOpenMouth: 0,
  mouthOh: 0,
  leftEyeStar: 0,
  rightEyeStar: 0,
  leftWantTwinkle: 0,
  rightWantTwinkle: 0,
  emotionFx: 0,
  sadTears: 0,
  happyTwinkle: 0,
  cheekOpacity: 0.65,
  leftWink: 0,
  rightWink: 0,
  spectacles: 1,
}

const MOOD_LAYER_MAP: Record<RabbitMood, Partial<RabbitMoodLayers>> = {
  neutral: {},
  happy: {
    leftDefaultEye: 0,
    rightDefaultEye: 0,
    defaultMouth: 0,
    leftHappyArc: 1,
    rightHappyArc: 1,
    happyOpenMouth: 1,
    happyTwinkle: 1,
    emotionFx: 1,
    cheekOpacity: 0.85,
  },
  sad: {
    sadBrows: 1,
    sadTears: 1,
    emotionFx: 1,
    defaultMouth: 0,
    sadMouth: 1,
    cheekOpacity: 0.45,
    spectacles: 0,
  },
  love: {
    leftEyeStar: 1,
    rightEyeStar: 1,
    leftWantTwinkle: 1,
    rightWantTwinkle: 1,
    happyTwinkle: 1,
    emotionFx: 1,
    cheekOpacity: 0.95,
  },
  winky: {
    leftDefaultEye: 0,
    rightDefaultEye: 1,
    leftWink: 1,
    happyTwinkle: 0.8,
    cheekOpacity: 0.75,
    spectacles: 0,
  },
  surprised: {
    defaultMouth: 0,
    mouthOh: 1,
  },
  thinking: {
    hmmLids: 1,
    defaultMouth: 0.6,
  },
  "side-eye": {
    leftDefaultEye: 0,
    rightDefaultEye: 0,
    sideEye: 1,
    defaultMouth: 0.7,
  },
  shy: {
    leftDefaultEye: 0,
    rightDefaultEye: 0,
    defaultMouth: 0,
    passwordFace: 0,
    shyFace: 1,
    spectacles: 0,
    cheekOpacity: 1,
  },
}

export function getRabbitMoodLayers(mood: RabbitMood): RabbitMoodLayers {
  return { ...NEUTRAL_LAYERS, ...MOOD_LAYER_MAP[mood] }
}

function setOpacity(el: Element | null, opacity: number) {
  if (!el) return
  el.setAttribute("opacity", String(opacity))
}

function setStyleTransform(el: Element | null, transform: string) {
  if (!(el instanceof SVGElement)) return
  el.style.transform = transform
  el.style.transformBox = "fill-box"
  el.style.transformOrigin = "50% 50%"
}

function setTransition(el: Element | null) {
  if (!(el instanceof SVGElement)) return
  el.style.transition =
    "opacity 0.28s ease, transform 0.28s ease, stroke-opacity 0.28s ease"
}

export function applyRabbitMood(root: ParentNode | null, mood: RabbitMood) {
  if (!root) return

  const layers = getRabbitMoodLayers(mood)

  const leftEye = root.querySelector("#left-eye")
  const rightEye = root.querySelector("#right-eye")
  const leftEyeContent = leftEye?.querySelector(":scope > g > g > g")
  const rightEyeContent = rightEye?.querySelector(":scope > g > g > g")

  if (leftEyeContent instanceof SVGElement) {
    setTransition(leftEyeContent)
    setOpacity(leftEyeContent, layers.leftDefaultEye)
  }

  if (rightEyeContent instanceof SVGElement) {
    setTransition(rightEyeContent)
    setOpacity(rightEyeContent, layers.rightDefaultEye)
  }

  const targets: [string, number][] = [
    ["#password-face", layers.passwordFace],
    ["#shy-face", layers.shyFace],
    ["#side-eye-eyes", layers.sideEye],
    ["#hmm-lids", layers.hmmLids],
    ["#sad-brows", layers.sadBrows],
    ["#happy-open-mouth", layers.happyOpenMouth],
    ["#mouth", layers.defaultMouth],
    ["#mouth-sad", layers.sadMouth],
    ["#mouth-oh", layers.mouthOh],
    ["#emotion-fx", layers.emotionFx],
    ["#sad-tears", layers.sadTears],
    ["#left-wink", layers.leftWink],
    ["#right-wink", layers.rightWink],
    ["#left-cheek", layers.cheekOpacity],
    ["#right-cheek", layers.cheekOpacity],
    ["#spectacles", layers.spectacles],
  ]

  for (const [selector, opacity] of targets) {
    const el = root.querySelector(selector)
    setTransition(el)
    setOpacity(el, opacity)
  }

  const sadTearPaths = root.querySelectorAll("#sad-tears path")
  sadTearPaths.forEach((path) => {
    setTransition(path)
    setOpacity(path, layers.sadTears)
  })

  const emotionSparkles = root.querySelector("#emotion-fx > g:not(#sad-tears)")
  if (emotionSparkles) {
    setTransition(emotionSparkles)
    setOpacity(emotionSparkles, layers.emotionFx)
  }

  const arcTargets: [string, number][] = [
    ["#left-eye-happy-arc", layers.leftHappyArc],
    ["#right-eye-happy-arc", layers.rightHappyArc],
  ]

  for (const [selector, active] of arcTargets) {
    const el = root.querySelector(selector)
    setTransition(el)
    setOpacity(el, active)
    setStyleTransform(el, active ? "scaleY(1)" : "scaleY(0.4)")
  }

  const starTargets: [string, number][] = [
    ["#left-eye-star", layers.leftEyeStar],
    ["#right-eye-star", layers.rightEyeStar],
    ["#left-eye-want-twinkle", layers.leftWantTwinkle],
    ["#right-eye-want-twinkle", layers.rightWantTwinkle],
    ["#happy-twinkle", layers.happyTwinkle],
  ]

  for (const [selector, active] of starTargets) {
    const el = root.querySelector(selector)
    setTransition(el)
    setOpacity(el, active)
    setStyleTransform(el, active ? "scale(1)" : "scale(0.5)")
  }

  setStyleTransform(
    root.querySelector("#mouth-oh"),
    layers.mouthOh ? "scale(1)" : "scaleX(0.72) scaleY(0.35)"
  )

  const ariaLabel = `Cute rabbit boy mascot, ${RABBIT_MOOD_LABELS[mood].toLowerCase()}`
  const svg = root instanceof SVGSVGElement ? root : root.querySelector("svg")
  svg?.setAttribute("aria-label", ariaLabel)

  setOpacity(root.querySelector("#blink-lids"), 0)
  setOpacity(root.querySelector("#left-blink-lid"), 0)
  setOpacity(root.querySelector("#right-blink-lid"), 0)
}
