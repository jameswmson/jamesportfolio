import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-full shrink-0 overflow-y-auto text-neutral-900'

const githubUrl =
  import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/JamesWiiiiamson'
const linkedinUrl =
  import.meta.env.VITE_LINKEDIN_URL ?? 'https://www.linkedin.com/in/james-williamson9573/'
const mailto =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'mailto:hello@example.com'

const socialLinkClass =
  'flex items-center gap-3 rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-8 py-4 text-lg font-bold text-neutral-900 transition hover:border-black hover:shadow-md'

export default function Contact() {
  const { sectionFade } = usePortfolioMotion()

  return (
    <section className={`${panelClass} flex flex-col items-center justify-center overflow-hidden`}>
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-12 px-6 pb-24 text-center"
        {...sectionFade}
      >
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-serif font-bold tracking-normal text-black md:text-6xl text-center">
            Contact
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-neutral-600 text-center text-lg md:text-xl">
            Check out my links below or download my resume!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={socialLinkClass}
          >
            <Github className="h-6 w-6 shrink-0" aria-hidden />
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className={socialLinkClass}
          >
            <Linkedin className="h-6 w-6 shrink-0" aria-hidden />
            LinkedIn
          </a>
          <a href={mailto} className={socialLinkClass}>
            <Mail className="h-6 w-6 shrink-0" aria-hidden />
            Email
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className={socialLinkClass}
          >
            <FileText className="h-6 w-6 shrink-0" aria-hidden />
            Resume
          </a>
        </div>
      </motion.div>
    </section>
  )
}
