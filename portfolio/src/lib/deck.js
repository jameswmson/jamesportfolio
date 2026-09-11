export const MOBILE_MAX = 820

export const isMobile = (vw) => vw <= MOBILE_MAX

/**
 * The desktop design is drawn once, at this size, and then scaled. Every
 * length outside the slabs is written as a multiple of `--u`, and the slabs
 * themselves are laid out at these reference pixels and scaled by the same
 * factor — so the page is the same drawing at every desktop size rather than a
 * fixed-size drawing floating in a growing window.
 */
export const REF_W = 1440
export const REF_H = 900

/**
 * One factor for the whole page. Fitting against both axes is what keeps the
 * proportions honest: scaling on width alone would push the cards off a short
 * screen, and the smaller of the two ratios is the largest the design can be
 * while still whole. It is deliberately uncapped, so a 4K monitor gets the
 * same composition as a laptop rather than the same pixel sizes.
 */
export function uiScale(vw, vh) {
  if (!vw || !vh) return 1
  if (isMobile(vw)) return 1
  return Math.min(vw / REF_W, vh / REF_H)
}

/** A reference-pixel length, for the screen-space lengths CSS owns. */
export const u = (n) => `calc(${n} * var(--u))`

/**
 * Ring geometry. `step` is the angle between neighbouring cards, deliberately
 * capped rather than derived from the card count: with only two or three cards
 * an even 360 split would put neighbours 120deg apart, past the point where
 * they turn their backs to the camera. Capping it keeps every visible card
 * facing forward and still reads as one ring when more cards are added.
 * `radiusK` is the ring radius as a multiple of card width, and `visible` is
 * how many cards stay on screen either side of the live one.
 *
 * `arc` and `tilt` bow the ring: cards sink and lean tangentially as they
 * travel around it, so the row curves instead of turning along a flat line.
 * Both are 0 on mobile, where there is no room for neighbours anyway and the
 * transform stays exactly as it was.
 */
const RING = {
  desktop: { step: 38, radiusK: 1.25, visible: 2, arc: 0.17, tilt: 5 },
  mobile: { step: 46, radiusK: 1.4, visible: 1, arc: 0, tilt: 0 },
}

/**
 * Each step off the front shrinks the card. This is not just depth cueing: a
 * turned card swings its leading edge toward the camera by half its width
 * times sin(angle), and if that reaches past z 0 it draws over the live card.
 * Shrinking the neighbours (with the radius below) keeps them wholly behind,
 * so the opaque live card occludes them properly.
 */
const SHRINK = 0.78

/** Reference width of a slab, matching --slab-w. */
const SLAB_W = 880

/**
 * Position one card on the carousel ring.
 * d === 0 is the live card, sitting square to the camera at z 0; the rest
 * swing away around an axis one radius behind it.
 */
export function deckStyle(index, active, { vw, vh } = {}) {
  const d = index - active
  const cfg = isMobile(vw) ? RING.mobile : RING.desktop
  const k = uiScale(vw, vh)

  // Ring scales with the cards so the composition holds at any size.
  const cardW = isMobile(vw) ? Math.max(1, vw - 32) : SLAB_W * k
  const r = (cardW * cfg.radiusK).toFixed(1)
  const away = Math.abs(d)

  // Pushing back one radius, turning, then coming forward one radius puts the
  // card on a ring centred behind the screen — and leaves d === 0 as identity,
  // so the live card renders exactly as it would flat.
  const ring = `translateZ(${-r}px) rotateY(${d * cfg.step}deg) translateZ(${r}px)`

  // Bow the row. rotateY leaves the Y axis alone, so this drop still reads as
  // vertical after the turn; 1 - cos gives a symmetric sag that grows with the
  // angle. rotateZ then leans each card along the tangent of that curve.
  const theta = (d * cfg.step * Math.PI) / 180
  const dip = (cfg.arc * cardW * (1 - Math.cos(theta))).toFixed(1)
  const curve = cfg.arc ? ` translateY(${dip}px) rotateZ(${(d * cfg.tilt).toFixed(2)}deg)` : ''

  // The card is laid out at reference size and scaled here, so its padding,
  // type and rules all travel with it and never need their own breakpoints.
  const s = k * SHRINK ** away
  const tail = ` translateY(var(--deck-shift-y)) scale(${s.toFixed(3)})`

  return {
    transform: `translate(-50%,-50%) ${ring}${curve}${tail}`,
    opacity: away > cfg.visible ? 0 : d === 0 ? 1 : Math.max(0, 0.5 - (away - 1) * 0.2),
    filter: d === 0 ? 'blur(0px)' : `blur(${Math.min(5, away * 1.6)}px)`,
    zIndex: 200 - away * 10,
    pointerEvents: d === 0 ? 'auto' : 'none',
    backfaceVisibility: 'hidden',
  }
}

export const pad = (n) => String(n).padStart(2, '0')

export function centerSlabTransform(vw, vh) {
  const k = uiScale(vw, vh)
  return `rotateY(var(--rx)) rotateX(var(--ry)) scale(${k.toFixed(3)}) translateY(var(--center-shift-y))`
}
