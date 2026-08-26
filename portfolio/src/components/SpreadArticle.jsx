import { motion } from 'framer-motion'
import Hairline from './Hairline.jsx'
import MaskHeadline from './MaskHeadline.jsx'
import EditorialLink from './EditorialLink.jsx'
import { typeEase } from '../motion/easing.js'

export default function SpreadArticle({
  kicker,
  title,
  headingId,
  meta,
  description,
  tags,
  href,
  hrefLabel,
  active,
  reducedMotion,
  offsetX = 0,
  offsetY = 0,
  placeholder = false,
}) {
  const bullets = Array.isArray(description) ? description : [description]

  return (
    <motion.article
      className="flex min-h-full flex-col justify-center px-[clamp(1.5rem,6vw,5rem)] py-16 md:py-20"
      initial={reducedMotion ? false : { x: offsetX, y: offsetY }}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: typeEase }}
    >
      <p className="mb-6 font-sans text-[11px] font-medium tracking-[0.22em] text-folio uppercase">
        {kicker}
      </p>
      <MaskHeadline
        id={headingId}
        active={active}
        reducedMotion={reducedMotion}
        className="max-w-4xl font-serif text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </MaskHeadline>
      <Hairline
        active={active}
        reducedMotion={reducedMotion}
        delay={0.1}
        className="mt-8 max-w-xl"
      />
      {meta && (
        <motion.p
          className="mt-6 max-w-xl text-sm tracking-wide text-muted"
          initial={reducedMotion ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.05, ease: typeEase }}
        >
          {meta}
        </motion.p>
      )}
      <motion.ul
        className="mt-8 max-w-2xl space-y-3 text-base leading-relaxed text-muted md:text-lg"
        initial={reducedMotion ? false : { y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.1, ease: typeEase }}
      >
        {bullets.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </motion.ul>
      {tags?.length > 0 && (
        <motion.ul
          className="mt-8 flex flex-wrap gap-2"
          initial={reducedMotion ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.15, ease: typeEase }}
        >
          {tags.map((tag) => (
            <li
              key={tag}
              className="border border-rule px-3 py-1 text-[11px] tracking-[0.14em] text-muted uppercase"
            >
              {tag}
            </li>
          ))}
        </motion.ul>
      )}
      {href && href !== '#' && (
        <motion.div
          className="mt-10"
          initial={reducedMotion ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.2, ease: typeEase }}
        >
          <EditorialLink href={href} className="text-sm tracking-[0.16em] uppercase">
            {hrefLabel ?? 'Repository'}
          </EditorialLink>
        </motion.div>
      )}
      {placeholder && (
        <p className="mt-8 text-xs tracking-wide text-folio uppercase">Placeholder — replace in data file</p>
      )}
    </motion.article>
  )
}
