import { motion } from 'framer-motion'

function StatCard({ label, value, tone = 'cyan', children }) {
  const toneStyles = {
    red: 'border-red-300/35 bg-red-400/10 text-red-200',
    cyan: 'border-cyan-300/35 bg-cyan-400/10 text-cyan-200',
    amber: 'border-amber-300/35 bg-amber-400/10 text-amber-200',
  }

  return (
    <motion.article
      whileHover={{ y: -2, scale: 1.01 }}
      className={`rounded-2xl border p-4 transition ${toneStyles[tone]}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <p className="mt-2 text-4xl font-black leading-none">{value}</p>
      {children ? <p className="mt-2 text-sm leading-relaxed text-slate-200">{children}</p> : null}
    </motion.article>
  )
}

export default StatCard
