import BulletList from '../components/BulletList.jsx'
import CardHeader from '../components/CardHeader.jsx'
import DeckSlab from '../components/DeckSlab.jsx'
import { pad } from '../lib/deck.js'
import { experience } from '../data/experience.js'

export default function Experience({ panel, viewport }) {
  return (
    <section
      id="experience"
      data-screen-label="04 Experience"
      className="stage-section overflow-hidden"
      style={{ perspective: '1500px', perspectiveOrigin: '42% 50%' }}
    >
      <div className="tilt absolute inset-0" style={{ transition: 'transform 260ms ease-out' }}>
        {experience.map((item, i) => (
          <DeckSlab key={item.title + i} index={i} active={panel} viewport={viewport} variant="stack">
            <CardHeader
              eyebrow={`Experience ${pad(i + 1)} / ${pad(experience.length)}`}
              title={item.title}
              meta={`${item.org}  ·  ${item.date}`}
            />
            <BulletList items={item.bullets} className="mt-[22px] max-w-[620px]" />
            {item.placeholder ? (
              <p className="mt-[26px] mb-0 font-mono text-[10px] leading-none tracking-[0.16em] text-chalk uppercase">
                Awaiting real content
              </p>
            ) : null}
          </DeckSlab>
        ))}
      </div>
    </section>
  )
}
