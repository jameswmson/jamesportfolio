export default function BulletList({ items, className = '' }) {
  return (
    <ul className={`card-body m-0 mt-5 flex list-none flex-col gap-[11px] p-0 ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
