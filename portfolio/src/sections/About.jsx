import { lazy, Suspense, useState } from 'react'

import { u } from '../lib/deck.js'

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
        perspective: 'var(--persp)',
      }}
    >
      <div
        className="grid w-full items-center justify-center"
        style={{
          gridTemplateColumns: 'var(--about-cols)',
          gap: 'var(--about-gap)',
          marginTop: 'var(--about-shift-y)',
        }}
      >
        <div
          className="mx-auto block overflow-hidden"
          style={{ width: 'var(--about-img-w)', aspectRatio: '1 / 1' }}
        >
          {webglOk ? (
            <Suspense fallback={<PortraitFallback />}>
              <DitheredHead
                src="/head.glb"
                padding={1.06}
                yOffset={0.1}
                speed={0.6}
                dotSize={3}
                transparent
                className="h-full w-full"
              />
            </Suspense>
          ) : (
            <PortraitFallback />
          )}
        </div>
        <div className="tilt">
          <p
            className="m-0 font-medium tracking-[0.24em] text-chalk uppercase"
            style={{ fontSize: u(11), marginBottom: u(14) }}
          >
            About
          </p>
          <h2
            className="m-0 font-serif leading-[0.98] font-bold tracking-[-0.03em] text-paper"
            style={{
              fontSize: 'var(--contact-fs)',
              textShadow: `${u(3)} ${u(3)} 0 rgba(0,0,0,0.55)`,
            }}
          >
            About
          </h2>
          <div
            className="h-px"
            style={{
              marginTop: u(26),
              width: u(200),
              background: 'linear-gradient(90deg,#78716C,transparent)',
            }}
          />
          <div
            className="flex flex-col text-stone-300"
            style={{
              marginTop: u(26),
              gap: u(14),
              fontSize: 'var(--about-body)',
              lineHeight: 1.6,
            }}
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
