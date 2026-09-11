import ExtrudedText from '../components/ExtrudedText.jsx'
import { u } from '../lib/deck.js'

export default function Hero() {
  return (
    <section
      id="home"
      data-screen-label="01 Hero"
      className="stage-section flex flex-col justify-center"
      style={{ padding: 'var(--hero-pad)', perspective: 'var(--persp-hero)' }}
    >
      <p
        className="m-0 font-medium tracking-[0.24em] text-chalk uppercase"
        style={{ fontSize: u(11), marginBottom: 'var(--hero-eyebrow-mb)' }}
      >
        Portfolio
      </p>
      <ExtrudedText lines={['James', 'Williamson']} />
      <div
        className="h-px w-full bg-[linear-gradient(90deg,#78716C,transparent)]"
        style={{ marginTop: 'var(--hero-rule-mt)', maxWidth: u(520) }}
      />
      <p
        className="mb-0 text-stone-300"
        style={{ fontSize: 'var(--hero-sub)', marginTop: 'var(--hero-sub-mt)' }}
      >
        Computer Science Student @ Western University
      </p>
      <p
        className="mb-0 tracking-[0.28em] text-chalk uppercase"
        style={{ fontSize: u(10.5), marginTop: 'var(--hero-scroll-mt)' }}
      >
        <span className="max-[820px]:hidden">Scroll</span>
        <span className="hidden max-[820px]:inline">Swipe</span>
      </p>
    </section>
  )
}
