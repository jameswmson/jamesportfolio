export const MOBILE_MAX = 820

export const isMobile = (vw) => vw <= MOBILE_MAX

/** Scale that fits an 880x600 slab inside the viewport. */
export function fitScale(vw, vh) {
  if (isMobile(vw)) return 1
  return Math.min(1, (vw - 178) / 880, (vh - 160) / 600)
}

/** Scale for the centered (non-deck) slabs, which are shorter. */
export function slabScale(vw, vh) {
  if (isMobile(vw)) return 1
  return Math.min(1, (vw - 178) / 880, (vh - 108) / 540)
}

/**
 * Position one card in the receding deck.
 * d < 0 has been dealt away, d === 0 is the live card, d > 0 waits stage-right.
 */
export function deckStyle(index, active, { vw, vh, spread = 150, depthOfField = true } = {}) {
  const d = index - active
  const f = fitScale(vw, vh)
  const k = ` translateY(var(--deck-shift-y)) scale(${f.toFixed(3)})`

  if (d < 0) {
    return {
      transform: `translate(-50%,-50%) translate3d(-150vw,0,240px) rotateY(30deg)${k}`,
      opacity: 0,
      filter: 'blur(0px)',
      zIndex: 1,
      pointerEvents: 'none',
    }
  }
  if (d === 0) {
    return {
      transform: `translate(-50%,-50%) translate3d(0,0,0) rotateY(0deg)${k}`,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 200,
      pointerEvents: 'auto',
    }
  }

  const off = isMobile(vw)
    ? vw * 1.1 + (d - 1) * vw * 0.9
    : (680 + (d - 1) * spread) * f
  const blur = depthOfField ? Math.min(6, d * 1.4) : 0

  return {
    transform: `translate(-50%,-50%) translate3d(${off}px,${d * 16 * f}px,${-380 * d}px) rotateY(-16deg)${k}`,
    opacity: Math.max(0, 0.45 - (d - 1) * 0.18),
    filter: `blur(${blur}px)`,
    zIndex: 200 - d * 10,
    pointerEvents: 'none',
  }
}

export const pad = (n) => String(n).padStart(2, '0')

export function centerSlabTransform(vw, vh) {
  return `rotateY(var(--rx)) rotateX(var(--ry)) scale(${slabScale(vw, vh).toFixed(3)}) translateY(var(--center-shift-y))`
}
