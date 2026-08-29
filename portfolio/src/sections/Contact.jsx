import { contactLinks, email } from '../data/contact.js'

export default function Contact() {
  return (
    <section
      id="contact"
      data-screen-label="07 Contact"
      className="stage-section flex flex-col justify-center"
      style={{ padding: '0 var(--pad-r) 0 var(--pad-l)', perspective: '1300px' }}
    >
      <p className="m-0 mb-6 text-[11px] font-medium tracking-[0.24em] text-chalk uppercase">
        Contact
      </p>
      <div className="tilt flex flex-col gap-1 max-[820px]:gap-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="self-start font-serif leading-[1.04] font-bold tracking-[-0.03em] text-paper no-underline transition-[text-shadow,transform] duration-200 ease-out [text-shadow:3px_3px_0_#57534E,6px_6px_0_#44403C,9px_9px_0_#302B27] hover:-translate-x-1 hover:-translate-y-1 hover:[text-shadow:5px_5px_0_#78716C,10px_10px_0_#57534E,15px_15px_0_#3F3A35]"
            style={{ fontSize: 'var(--contact-fs)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="mt-[34px] mb-0 text-[12px] tracking-[0.06em] text-chalk">{email}</p>
    </section>
  )
}
