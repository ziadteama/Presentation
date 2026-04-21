import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

function TitleSection({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
        <ShieldCheck size={14} />
        Graduation Project
      </div>

      <h1 className="mt-6 text-6xl font-black leading-[1.05] text-transparent bg-linear-to-r from-cyan-200 via-white to-amber-200 bg-clip-text">
        {title}
      </h1>

      <p className="mt-4 text-lg font-medium tracking-wide text-slate-300">{subtitle}</p>
    </motion.div>
  )
}

export default TitleSection
