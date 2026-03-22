import { motion } from 'framer-motion'
import { projects } from '../data/projects.js'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-full shrink-0 overflow-y-auto text-neutral-900'

export default function Projects() {
  const { sectionFade, projectCard } = usePortfolioMotion()

  return (
    <section className={`${panelClass} flex flex-col items-center justify-center`}>
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 pb-24 text-center"
        {...sectionFade}
      >
        <h2 className="text-5xl font-serif font-bold tracking-normal text-black md:text-6xl text-center">
          Projects
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600 text-center">
          Selected work — swap in your real URLs and copy in{' '}
          <code className="inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-sm ring-1 ring-neutral-200">
            src/data/projects.js
          </code>
          .
        </p>
        <div className="mx-auto mt-10 grid w-full max-w-6xl justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              {...projectCard(index)}
              className="flex w-full flex-col items-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-5 text-center shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-black text-center">
                {project.title}
              </h3>
              {project.date && (
                <p className="mt-1 text-xs font-bold text-neutral-400 text-center">
                  {project.date}
                </p>
              )}
              <div className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600 text-left w-full">
                {Array.isArray(project.description) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm font-medium">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border-2 border-neutral-900 bg-white px-5 py-2 text-neutral-900 transition hover:bg-neutral-100 hover:shadow-sm"
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
