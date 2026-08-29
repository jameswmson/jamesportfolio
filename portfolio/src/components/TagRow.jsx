export default function TagRow({ tags }) {
  return (
    <ul className="m-0 mt-[22px] flex list-none flex-wrap items-center gap-4 p-0 text-[10px] tracking-[0.18em] text-[#8C8070] uppercase">
      {tags.map((tag, i) => (
        <li key={tag} className="contents">
          {i > 0 ? <span className="opacity-40" aria-hidden="true">/</span> : null}
          <span>{tag}</span>
        </li>
      ))}
    </ul>
  )
}
