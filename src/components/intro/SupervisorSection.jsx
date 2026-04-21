import { motion } from 'framer-motion'

function SupervisorSection({ name }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.45 }}
      className="mt-8"
    >
      <div className="rounded-2xl border border-amber-300/30 bg-amber-400/10 px-6 py-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-200">Supervised By</p>
        <p className="mt-2 text-lg font-bold text-amber-100">{name}</p>
      </div>
    </motion.section>
  )
}

export default SupervisorSection
