/** Real screenshot when one exists, striped placeholder until then. */
export default function ShotTile({ src, alt, label }) {
  if (src) {
    return <img src={src} alt={alt} className="placeholder-tile aspect-[4/5] w-full object-cover" />
  }
  return (
    <div className="placeholder-tile aspect-[4/5] items-end justify-center pb-3">
      <span className="font-mono text-[9.5px] leading-none tracking-[0.16em] text-[#8C8070] uppercase">
        {label}
      </span>
    </div>
  )
}
