import { motion } from 'framer-motion'
import { projects } from '../data/projects.js'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-screen shrink-0 overflow-y-auto bg-white text-neutral-900'

export default function Projects() {
  const { sectionFade, projectCard } = usePortfolioMotion()

  return (
    <section className={panelClass}>
      <motion.div
        className="mx-auto max-w-6xl px-6 py-14 pb-28 md:py-16"
        {...sectionFade}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
          Projects
        </h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Selected work — swap in your real URLs and copy in{' '}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm ring-1 ring-neutral-200">
            src/data/projects.js
          </code>
          .
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              {...projectCard(index)}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-black">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-neutral-800"
                >
                  Live demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border-2 border-neutral-900 px-4 py-2 text-neutral-900 transition hover:bg-neutral-100"
                >
                  Repository
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
