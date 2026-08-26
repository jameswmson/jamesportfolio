import PanelTrack from '../components/PanelTrack.jsx'
import SpreadArticle from '../components/SpreadArticle.jsx'
import { experience } from '../data/experience.js'
import { headingIdFor } from '../data/sections.js'
import { useStage } from '../context/StageContext.jsx'

function ExperienceSpread({ item, index, count }) {
  const { isDesktop, section, panelIndex, reducedMotion, panelDir, sectionDir, lastTravel } =
    useStage()
  const active = !isDesktop || (section.id === 'experience' && panelIndex === index)
  const offsetX = isDesktop && lastTravel === 'panel' ? panelDir * 24 : 0
  const offsetY = isDesktop && lastTravel === 'section' ? sectionDir * 24 : 0
  const meta = [item.org, item.dates].filter(Boolean).join('  ·  ')

  return (
    <SpreadArticle
      kicker={`Experience ${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`}
      title={item.title}
      headingId={headingIdFor({ id: 'experience', items: experience }, index)}
      meta={meta}
      description={item.description}
      tags={item.tags}
      active={active}
      reducedMotion={reducedMotion}
      offsetX={offsetX}
      offsetY={offsetY}
      placeholder={item.placeholder}
    />
  )
}

export default function Experience() {
  const { isDesktop } = useStage()

  if (!isDesktop) {
    return (
      <section id="experience" className="min-h-dvh">
        {experience.map((item, index) => (
          <div key={item.slug} className="min-h-dvh border-t border-rule">
            <ExperienceSpread item={item} index={index} count={experience.length} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="experience" className="h-full min-h-0">
      <PanelTrack sectionId="experience">
        {experience.map((item, index) => (
          <ExperienceSpread key={item.slug} item={item} index={index} count={experience.length} />
        ))}
      </PanelTrack>
    </section>
  )
}
