import ExtrudedText from '../components/ExtrudedText.jsx'

export default function Hero() {
  return (
    <section
      id="home"
      data-screen-label="01 Hero"
      className="stage-section flex flex-col justify-center"
      style={{ padding: 'var(--hero-pad)', perspective: '1300px' }}
    >
      <p className="m-0 mb-[26px] max-[820px]:mb-4 text-[11px] font-medium tracking-[0.24em] text-chalk uppercase">
        Portfolio
      </p>
      <ExtrudedText lines={['James', 'Williamson']} />
      <div className="mt-8 max-[820px]:mt-2 h-px w-full max-w-[520px] bg-[linear-gradient(90deg,#78716C,transparent)]" />
      <p className="mt-[26px] max-[820px]:mt-4 mb-0 text-stone-300" style={{ fontSize: 'var(--hero-sub)' }}>
        Computer Science Student @ Western University
      </p>
      <p className="mt-[34px] max-[820px]:mt-6 mb-0 text-[10.5px] tracking-[0.28em] text-chalk uppercase">
        <span className="max-[820px]:hidden">Scroll</span>
        <span className="hidden max-[820px]:inline">Swipe</span>
      </p>
    </section>
  )
}
