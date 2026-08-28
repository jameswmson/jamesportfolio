import CenterSlab from '../components/CenterSlab.jsx'

export default function About({ viewport }) {
  return (
    <section
      id="about"
      data-screen-label="02 About"
      className="stage-section flex items-center justify-center overflow-hidden"
      style={{
        padding: '0 var(--pad-r) 0 var(--pad-l)',
        perspective: '1500px',
      }}
    >
      <CenterSlab viewport={viewport}>
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: 'var(--about-cols)', gap: 'var(--about-gap)' }}
        >
          <img
            src="/avatar.jpg"
            alt="Portrait of James Williamson"
            className="block object-cover shadow-[8px_8px_0_#D6D3D1]"
            style={{
              width: 'var(--about-img-w)',
              height: 'var(--about-img-h)',
              transform: 'translateZ(40px)',
            }}
          />
          <div>
            <p className="eyebrow m-0 mb-3.5 text-folio">About</p>
            <h2 className="card-title m-0">About</h2>
            <div className="mt-[22px] h-px w-[200px] bg-rule" />
            <div className="card-body mt-[22px] flex flex-col gap-3.5">
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
      </CenterSlab>
    </section>
  )
}
