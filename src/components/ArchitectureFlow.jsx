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
    <div className="rounded-2xl border border-cyan-400/30 bg-slate-950/70 p-4 sm:p-6">
      <div className="grid gap-4 md:grid-cols-6">
        {stages.map((stage, index) => (
          <div key={stage} className="relative">
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-center text-sm font-semibold text-slate-200">
              {stage}
            </div>
            {index < stages.length - 1 ? (
              <span className="hidden text-cyan-300 md:absolute md:-right-3 md:top-1/2 md:block md:-translate-y-1/2">
                {'->'}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitectureFlow
