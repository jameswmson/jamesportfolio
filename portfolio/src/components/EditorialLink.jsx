export default function EditorialLink({ href, children, className = '' }) {
  const external = href.startsWith('http') || href.startsWith('mailto:')
  return (
    <a
      href={href}
      target={external && href.startsWith('http') ? '_blank' : undefined}
      rel={external && href.startsWith('http') ? 'noreferrer' : undefined}
      className={`editorial-link cursor-pointer text-ink ${className}`}
    >
      {children}
    </a>
  )
}
