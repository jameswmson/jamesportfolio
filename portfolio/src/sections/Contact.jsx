import { contactLinks, email } from '../data/contact.js'
import { u } from '../lib/deck.js'

export default function Contact() {
  return (
    <section
      id="contact"
      data-screen-label="06 Contact"
      className="stage-section flex flex-col justify-center"
      style={{ padding: '0 var(--pad-r) 0 var(--pad-l)', perspective: 'var(--persp-hero)' }}
    >
      <p
        className="m-0 font-medium tracking-[0.24em] text-chalk uppercase"
        style={{ fontSize: u(11), marginBottom: u(24) }}
      >
        Contact
      </p>
      <div className="tilt flex flex-col" style={{ gap: 'var(--contact-gap)' }}>
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="contact-link self-start font-serif leading-[1.04] font-bold tracking-[-0.03em] text-paper no-underline"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p
        className="mb-0 tracking-[0.06em] text-chalk"
        style={{ fontSize: u(12), marginTop: u(34) }}
      >
        {email}
      </p>
    </section>
  )
}
