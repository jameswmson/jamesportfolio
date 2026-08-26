import PanelTrack from '../components/PanelTrack.jsx'
import SpreadArticle from '../components/SpreadArticle.jsx'
import { projects } from '../data/projects.js'
import { headingIdFor } from '../data/sections.js'
import { useStage } from '../context/StageContext.jsx'

function ProjectSpread({ project, index, count }) {
  const { isDesktop, section, panelIndex, reducedMotion, panelDir, sectionDir, lastTravel } =
    useStage()
  const active = !isDesktop || (section.id === 'projects' && panelIndex === index)
  const offsetX = isDesktop && lastTravel === 'panel' ? panelDir * 24 : 0
  const offsetY = isDesktop && lastTravel === 'section' ? sectionDir * 24 : 0

  return (
    <SpreadArticle
      kicker={`Project ${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`}
      title={project.title}
      headingId={headingIdFor({ id: 'projects', items: projects }, index)}
      meta={project.date}
      description={project.description}
      tags={project.tags}
      href={project.repoUrl}
      hrefLabel="Repository"
      active={active}
      reducedMotion={reducedMotion}
      offsetX={offsetX}
      offsetY={offsetY}
    />
  )
}

export default function Projects() {
  const { isDesktop } = useStage()

  if (!isDesktop) {
    return (
      <section id="projects" className="min-h-dvh">
        {projects.map((project, index) => (
          <div key={project.slug} className="min-h-dvh border-t border-rule first:border-t-0">
            <ProjectSpread project={project} index={index} count={projects.length} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="projects" className="h-full min-h-0">
      <PanelTrack sectionId="projects">
        {projects.map((project, index) => (
          <ProjectSpread key={project.slug} project={project} index={index} count={projects.length} />
        ))}
      </PanelTrack>
    </section>
  )
}
