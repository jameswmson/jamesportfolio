import CenterSlab from '../components/CenterSlab.jsx'
import { skillGroups } from '../data/skills.js'

export default function Skills({ viewport }) {
  return (
    <section
      id="skills"
      data-screen-label="05 Skills"
      className="stage-section flex items-center justify-center overflow-hidden"
      style={{ padding: '0 var(--pad-r) 0 var(--pad-l)', perspective: '1500px' }}
    >
      <CenterSlab viewport={viewport}>
        <p className="eyebrow m-0 mb-3.5 text-chalk">Skills</p>
        <h2 className="card-title m-0">Skills</h2>
        <p className="card-body mt-5 mb-0">Languages and tools I use most often.</p>
        <div
          className="mt-[34px] grid"
          style={{ gridTemplateColumns: 'var(--skills-cols)', gap: 'var(--skills-gap)' }}
        >
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="m-0 mb-3.5 text-[10.5px] font-medium tracking-[0.2em] text-[#8C8070] uppercase">
                {group.title}
              </h3>
              <ul
                className="skill-list m-0 list-none p-0 text-paper"
                style={{ fontSize: 'var(--card-body)' }}
              >
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CenterSlab>
    </section>
  )
}
