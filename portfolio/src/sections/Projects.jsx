import BulletList from '../components/BulletList.jsx'
import CardHeader from '../components/CardHeader.jsx'
import DeckSlab from '../components/DeckSlab.jsx'
import ShotTile from '../components/ShotTile.jsx'
import TagRow from '../components/TagRow.jsx'
import { pad } from '../lib/deck.js'
import { projects } from '../data/projects.js'

export default function Projects({ panel, viewport }) {
  return (
    <section
      id="projects"
      data-screen-label="03 Projects"
      className="stage-section overflow-hidden"
      style={{ perspective: '1500px', perspectiveOrigin: '42% 50%' }}
    >
      <div className="tilt absolute inset-0" style={{ transition: 'transform 260ms ease-out' }}>
        {projects.map((project, i) => (
          <DeckSlab key={project.slug} index={i} active={panel} viewport={viewport} variant="grid">
            <div>
              <CardHeader
                eyebrow={`Project ${pad(i + 1)} / ${pad(projects.length)}`}
                title={project.title}
                meta={project.date}
                rule={false}
              />
              <BulletList items={project.description} />
              <TagRow tags={project.tags} />
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-[26px] inline-block border-b border-ink pb-0.5 text-[12px] tracking-[0.16em] text-ink uppercase no-underline"
              >
                Repository
              </a>
            </div>
            <ShotTile
              src={project.image}
              alt={`${project.title} screenshot`}
              label={project.imageLabel}
            />
          </DeckSlab>
        ))}
      </div>
    </section>
  )
}
