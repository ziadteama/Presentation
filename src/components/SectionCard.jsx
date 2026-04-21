import { motion } from 'framer-motion'

function SectionCard({ icon: Icon, title, active, onClick, index }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -1, scale: 1.008 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex min-h-20 w-full items-center gap-2 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition ${
        active
          ? 'border-cyan-300/60 bg-cyan-400/12 shadow-[0_8px_18px_rgba(34,211,238,0.12)]'
          : 'border-slate-500/20 bg-black/15 hover:border-cyan-400/40 hover:bg-black/25'
      }`}
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[10px] font-black transition ${
        active ? 'border-cyan-300/70 bg-cyan-400/15 text-cyan-100' : 'border-slate-500/30 bg-black/20 text-slate-200'
      }`}>
        {index < 10 ? `0${index}` : index}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="toc-card-title text-xs font-black leading-snug text-white xl:text-sm">{title}</h3>
          </div>
          {Icon ? (
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-400/10 p-1.5 text-cyan-300">
              <Icon size={14} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-cyan-400 via-amber-400 to-red-500 opacity-0 transition group-hover:opacity-100" />
    </motion.button>
  )
}

export default SectionCard
