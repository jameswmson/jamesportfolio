export default function CornerDoodles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top Left */}
      <div className="absolute top-4 left-4 h-32 w-32 opacity-30 xl:top-8 xl:left-8">
        <svg viewBox="0 0 100 100" className="h-full w-full text-neutral-400" fill="currentColor">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" strokeWidth="2" fill="none" stroke="currentColor" />
          <text x="50" y="55" fontSize="10" textAnchor="middle" fill="currentColor">Doodle TL</text>
        </svg>
      </div>
      
      {/* Top Right */}
      <div className="absolute top-4 right-4 h-32 w-32 opacity-30 xl:top-8 xl:right-8">
        <svg viewBox="0 0 100 100" className="h-full w-full text-neutral-400" fill="currentColor">
          <rect x="20" y="20" width="60" height="60" strokeDasharray="4 4" strokeWidth="2" fill="none" stroke="currentColor" />
          <text x="50" y="55" fontSize="10" textAnchor="middle" fill="currentColor">Doodle TR</text>
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 h-32 w-32 opacity-30 xl:bottom-8 xl:left-8">
        <svg viewBox="0 0 100 100" className="h-full w-full text-neutral-400" fill="currentColor">
          <polygon points="50,15 90,85 10,85" strokeDasharray="4 4" strokeWidth="2" fill="none" stroke="currentColor" />
          <text x="50" y="65" fontSize="10" textAnchor="middle" fill="currentColor">Doodle BL</text>
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 h-32 w-32 opacity-30 xl:bottom-8 xl:right-8">
        <svg viewBox="0 0 100 100" className="h-full w-full text-neutral-400" fill="currentColor">
          <path d="M 20 20 Q 80 20 80 80 T 20 80" strokeDasharray="4 4" strokeWidth="2" fill="none" stroke="currentColor" />
          <text x="50" y="55" fontSize="10" textAnchor="middle" fill="currentColor">Doodle BR</text>
        </svg>
      </div>
    </div>
  )
}
