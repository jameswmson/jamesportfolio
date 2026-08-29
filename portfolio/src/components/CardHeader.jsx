/** Eyebrow + serif title + rule + meta line, shared by every card. */
export default function CardHeader({ eyebrow, title, meta, rule = true }) {
  return (
    <>
      <p className="eyebrow m-0 mb-3.5 text-chalk">{eyebrow}</p>
      <h2 className="card-title m-0">{title}</h2>
      {rule ? (
        <div
          className="mt-6 h-px w-[200px]"
          style={{ background: 'linear-gradient(90deg,#78716C,transparent)' }}
        />
      ) : null}
      {meta ? <p className="mt-4 mb-0 text-[12.5px] tracking-[0.03em] text-[#8C8070]">{meta}</p> : null}
    </>
  )
}
