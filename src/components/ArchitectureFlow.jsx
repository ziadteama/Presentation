const stages = [
  'Acquisition',
  'Preprocessing',
  'Feature Extraction',
  'Sensor Fusion',
  'Decision Making',
  'Alert Generation',
]

function ArchitectureFlow() {
  return (
    <div className="info-card rounded-2xl border p-6">
      <div className="relative grid grid-cols-6 gap-3">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.4)_0_18px,transparent_18px_30px)]" />
        {stages.map((stage, index) => (
          <div key={stage} className="group relative z-10">
            <div className="rounded-xl border border-current/20 bg-black/20 p-4 text-center text-sm font-semibold transition group-hover:-translate-y-1 group-hover:border-cyan-400/60">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-current/55">Stage {index + 1}</p>
              <p>{stage}</p>
            </div>
            {index < stages.length - 1 ? (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-300/80">
                {'>'}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitectureFlow
