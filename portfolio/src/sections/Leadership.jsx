import PanelTrack from '../components/PanelTrack.jsx'
import SpreadArticle from '../components/SpreadArticle.jsx'
import { leadership } from '../data/leadership.js'
import { headingIdFor } from '../data/sections.js'
import { useStage } from '../context/StageContext.jsx'

function LeadershipSpread({ item, index, count }) {
  const { isDesktop, section, panelIndex, reducedMotion, panelDir, sectionDir, lastTravel } =
    useStage()
  const active = !isDesktop || (section.id === 'leadership' && panelIndex === index)
  const offsetX = isDesktop && lastTravel === 'panel' ? panelDir * 24 : 0
  const offsetY = isDesktop && lastTravel === 'section' ? sectionDir * 24 : 0
  const meta = [item.org, item.dates].filter(Boolean).join('  ·  ')

  return (
    <SpreadArticle
      kicker={`Leadership ${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`}
      title={item.title}
      headingId={headingIdFor({ id: 'leadership', items: leadership }, index)}
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

export default function Leadership() {
  const { isDesktop } = useStage()

  if (!isDesktop) {
    return (
      <section id="leadership" className="min-h-dvh">
        {leadership.map((item, index) => (
          <div key={item.slug} className="min-h-dvh border-t border-rule">
            <LeadershipSpread item={item} index={index} count={leadership.length} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="leadership" className="h-full min-h-0">
      <PanelTrack sectionId="leadership">
        {leadership.map((item, index) => (
          <LeadershipSpread key={item.slug} item={item} index={index} count={leadership.length} />
        ))}
      </PanelTrack>
    </section>
  )
}
