import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import EditorialLink from '../components/EditorialLink.jsx'
import { useStage } from '../context/StageContext.jsx'

const githubUrl =
  import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/JamesWiiiiamson'
const linkedinUrl =
  import.meta.env.VITE_LINKEDIN_URL ?? 'https://www.linkedin.com/in/james-williamson9573/'
const mailto =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'mailto:Jaswmson@gmail.com'

const links = [
  { href: githubUrl, label: 'GitHub', Icon: Github },
  { href: linkedinUrl, label: 'LinkedIn', Icon: Linkedin },
  { href: mailto, label: 'Email', Icon: Mail },
  { href: '/resume.pdf', label: 'Resume', Icon: FileText },
]

export default function Contact() {
  const { isDesktop } = useStage()

  return (
    <section
      id="contact"
      className={`flex min-h-full flex-col justify-center px-[clamp(1.5rem,6vw,5rem)] py-20 ${
        isDesktop ? 'h-full overflow-y-auto' : 'min-h-dvh pb-28'
      }`}
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-6 font-sans text-[11px] font-medium tracking-[0.22em] text-folio uppercase">
          Contact
        </p>
        <h2
          id="heading-contact"
          tabIndex={-1}
          className="font-serif text-5xl leading-[1.05] font-bold tracking-tight text-ink outline-none md:text-6xl lg:text-7xl"
        >
          Contact
        </h2>
        <div className="mt-8 h-px max-w-xs bg-rule" aria-hidden />
        <p className="mt-6 max-w-lg text-lg text-muted">Check out my links or my resume.</p>
        <ul className="mt-12 space-y-5">
          {links.map((link) => {
            const Glyph = link.Icon
            return (
              <li key={link.label}>
                <EditorialLink href={link.href} className="inline-flex items-center gap-3 text-xl md:text-2xl">
                  <Glyph className="h-5 w-5 shrink-0" aria-hidden />
                  {link.label}
                </EditorialLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
