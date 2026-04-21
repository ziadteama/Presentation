import { motion } from 'framer-motion'

const toneStyles = {
  red: 'border-red-300/25 bg-red-400/10 text-red-100',
  orange: 'border-orange-300/25 bg-orange-400/10 text-orange-100',
  yellow: 'border-amber-300/25 bg-amber-400/10 text-amber-100',
  emerald: 'border-emerald-300/35 bg-emerald-400/10 text-emerald-100',
}

function StepCard({ step, icon: Icon, active, onClick, index }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group flex min-h-42.5 flex-col rounded-2xl border p-4 text-left transition ${
        active ? 'shadow-[0_0_30px_rgba(34,211,238,0.16)]' : 'border-slate-500/20 bg-black/15 hover:border-slate-300/35'
      } ${toneStyles[step.tone]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">0{index + 1}</p>
          <h3 className="mt-2 text-base font-black leading-tight xl:text-lg">{step.title}</h3>
        </div>
        {Icon ? (
          <div className={`rounded-xl border p-2 ${active ? 'border-current/40 bg-black/15' : 'border-current/20 bg-black/10'}`}>
            <Icon size={16} />
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-sm font-semibold opacity-90">{step.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-current/80">{step.description}</p>

      <div
        className={`mt-auto h-1 w-full rounded-full bg-linear-to-r opacity-70 transition group-hover:opacity-100 ${
          step.dominant ? 'from-emerald-300 via-cyan-300 to-white' : 'from-current via-current to-current'
        }`}
      />
    </motion.button>
  )
}

export default StepCard
