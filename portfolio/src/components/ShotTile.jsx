import { useState } from 'react'

/**
 * Real screenshot when one exists, striped placeholder until then.
 *
 * The placeholder keeps a fixed 4/5 box, but a real shot renders at its own
 * aspect ratio: cropping these charts and screenshots into a portrait box with
 * object-cover threw away more than half of each one. The height cap stops a
 * portrait shot from towering over the landscape ones beside it — contain
 * scales it down rather than cropping. A src that fails to load falls back to
 * the placeholder too, so a path can be set before the file lands.
 */
export default function ShotTile({ src, alt, label }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="shot-tile max-h-[340px] w-full object-contain"
      />
    )
  }

  return (
    <div className="placeholder-tile aspect-[4/5] items-end justify-center pb-3">
      <span className="font-mono text-[9.5px] leading-none tracking-[0.16em] text-[#8C8070] uppercase">
        {label}
      </span>
    </div>
  )
}
