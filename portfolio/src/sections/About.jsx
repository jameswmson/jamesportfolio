import { lazy, Suspense, useState } from 'react'

const DitheredHead = lazy(() => import('../components/DitheredHead.jsx'))

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function PortraitFallback() {
  return (
    <img
      src="/avatar.jpg"
      alt="Portrait of James Williamson"
      className="block h-full w-full object-cover"
    />
  )
}

export default function About() {
  const [webglOk] = useState(hasWebGL)

  return (
    <section
      id="about"
      data-screen-label="02 About"
      className="stage-section flex items-center"
      style={{
        padding: '0 var(--pad-r) 0 var(--pad-l)',
        perspective: '1500px',
      }}
    >
      <div
        className="tilt grid w-full items-center"
        style={{ gridTemplateColumns: 'var(--about-cols)', gap: 'var(--about-gap)' }}
      >
        <div
          className="block overflow-hidden"
          style={{ width: 'var(--about-img-w)', height: 'var(--about-img-h)' }}
        >
          {webglOk ? (
            <Suspense fallback={<PortraitFallback />}>
              <DitheredHead src="/head.glb" speed={0} transparent className="h-full w-full" />
            </Suspense>
          ) : (
            <PortraitFallback />
          )}
        </div>
        <div>
          <p className="m-0 mb-3.5 text-[11px] font-medium tracking-[0.24em] text-chalk uppercase">
            About
          </p>
          <h2
            className="m-0 font-serif leading-[0.98] font-bold tracking-[-0.03em] text-paper"
            style={{ fontSize: 'var(--contact-fs)', textShadow: '3px 3px 0 rgba(0,0,0,0.55)' }}
          >
            About
          </h2>
          <div
            className="mt-[26px] h-px w-[200px]"
            style={{ background: 'linear-gradient(90deg,#78716C,transparent)' }}
          />
          <div
            className="mt-[26px] flex flex-col gap-3.5 text-stone-300"
            style={{ fontSize: 'var(--card-body)', lineHeight: 1.6 }}
          >
            <p className="m-0">
              Hey! I&apos;m James, a developer who&apos;s passionate about turning ideas into
              solutions. I am in my First Year at Western University studying computer science, I
              enjoy building projects, solving problems, exploring the world, and playing games.
            </p>
            <p className="m-0">
              I&apos;m also a big believer in community engagement and love meeting new people, so
              feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
