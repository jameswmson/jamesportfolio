import { u } from '../lib/deck.js'

const LAYERS = [
  [-70, '#3F3A35'],
  [-60, '#474138'],
  [-50, '#544D42'],
  [-40, '#63594C'],
  [-30, '#756A5A'],
  [-20, '#8C8070'],
  [-10, '#B5AB9B'],
]

const TYPE = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--hero-fs)',
  lineHeight: 0.94,
  fontWeight: 700,
  letterSpacing: '-0.035em',
}

/**
 * Stacked copies of the same words in translateZ to fake a cut-metal extrusion.
 * The depths are reference pixels: the extrusion has to grow with the type, or
 * the letters would look progressively flatter on larger screens.
 */
export default function ExtrudedText({ lines }) {
  const words = lines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ))

  return (
    <div className="tilt relative" style={{ height: 'var(--hero-h)' }}>
      {LAYERS.map(([z, color]) => (
        <div
          key={z}
          aria-hidden="true"
          className="absolute inset-0"
          style={{ ...TYPE, color, transform: `translateZ(${u(z)})` }}
        >
          {words}
        </div>
      ))}
      <h1 className="absolute inset-0 m-0 text-paper" style={TYPE}>
        {words}
      </h1>
    </div>
  )
}
