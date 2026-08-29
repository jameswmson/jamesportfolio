import BulletList from '../components/BulletList.jsx'
import CardHeader from '../components/CardHeader.jsx'
import DeckSlab from '../components/DeckSlab.jsx'
import { pad } from '../lib/deck.js'
import { leadership } from '../data/leadership.js'

export default function Leadership({ panel, viewport }) {
  return (
    <section
      id="leadership"
      data-screen-label="05 Leadership"
      className="stage-section overflow-hidden"
      style={{ perspective: '1500px', perspectiveOrigin: '42% 50%' }}
    >
      <div className="tilt absolute inset-0" style={{ transition: 'transform 260ms ease-out' }}>
        {leadership.map((item, i) => (
          <DeckSlab key={item.title + i} index={i} active={panel} viewport={viewport} variant="stack">
            <CardHeader
              eyebrow={`Leadership ${pad(i + 1)} / ${pad(leadership.length)}`}
              title={item.title}
              meta={`${item.org}  ·  ${item.date}`}
            />
            <BulletList items={item.bullets} className="mt-[22px] max-w-[620px]" />
            {item.placeholder ? (
              <p className="mt-[26px] mb-0 font-mono text-[10px] leading-none tracking-[0.16em] text-[#78716C] uppercase">
                Awaiting real content
              </p>
            ) : null}
          </DeckSlab>
        ))}
      </div>
    </section>
  )
}
