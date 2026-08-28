export default function TagRow({ tags }) {
  return (
    <ul className="m-0 mt-[22px] flex list-none flex-wrap gap-[9px] p-0">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}
