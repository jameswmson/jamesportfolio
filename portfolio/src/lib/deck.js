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
 * Ring geometry. `step` is the angle between neighbouring cards, deliberately
 * capped rather than derived from the card count: with only two or three cards
 * an even 360 split would put neighbours 120deg apart, past the point where
 * they turn their backs to the camera. Capping it keeps every visible card
 * facing forward and still reads as one ring when more cards are added.
 * `radiusK` is the ring radius as a multiple of card width, and `visible` is
 * how many cards stay on screen either side of the live one.
 */
const RING = {
  desktop: { step: 38, radiusK: 1.25, visible: 2 },
  mobile: { step: 46, radiusK: 1.4, visible: 1 },
}

/**
 * Each step off the front shrinks the card. This is not just depth cueing: a
 * turned card swings its leading edge toward the camera by half its width
 * times sin(angle), and if that reaches past z 0 it draws over the live card.
 * Shrinking the neighbours (with the radius below) keeps them wholly behind,
 * so the opaque live card occludes them properly.
 */
const SHRINK = 0.78

/**
 * Position one card on the carousel ring.
 * d === 0 is the live card, sitting square to the camera at z 0; the rest
 * swing away around an axis one radius behind it.
 */
export function deckStyle(index, active, { vw, vh } = {}) {
  const d = index - active
  const cfg = isMobile(vw) ? RING.mobile : RING.desktop
  const f = fitScale(vw, vh)

  // Ring scales with the cards so the composition holds as the slab shrinks.
  const cardW = isMobile(vw) ? Math.max(1, vw - 32) : 880 * f
  const r = (cardW * cfg.radiusK).toFixed(1)
  const away = Math.abs(d)

  // Pushing back one radius, turning, then coming forward one radius puts the
  // card on a ring centred behind the screen — and leaves d === 0 as identity,
  // so the live card renders exactly as it would flat.
  const ring = `translateZ(${-r}px) rotateY(${d * cfg.step}deg) translateZ(${r}px)`
  const s = f * SHRINK ** away
  const tail = ` translateY(var(--deck-shift-y)) scale(${s.toFixed(3)})`

  return {
    transform: `translate(-50%,-50%) ${ring}${tail}`,
    opacity: away > cfg.visible ? 0 : d === 0 ? 1 : Math.max(0, 0.5 - (away - 1) * 0.2),
    filter: d === 0 ? 'blur(0px)' : `blur(${Math.min(5, away * 1.6)}px)`,
    zIndex: 200 - away * 10,
    pointerEvents: d === 0 ? 'auto' : 'none',
    backfaceVisibility: 'hidden',
  }
}

export const pad = (n) => String(n).padStart(2, '0')

export function centerSlabTransform(vw, vh) {
  return `rotateY(var(--rx)) rotateX(var(--ry)) scale(${slabScale(vw, vh).toFixed(3)}) translateY(var(--center-shift-y))`
}
