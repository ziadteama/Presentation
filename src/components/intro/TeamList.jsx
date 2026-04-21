import { motion } from 'framer-motion'

function TeamList({ names }) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.2,
          },
        },
      }}
      className="mt-10 w-full max-w-4xl"
    >
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Presented By</p>

      <div className="grid grid-cols-3 gap-3">
        {names.map((name) => (
          <motion.article
            key={name}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
            }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="rounded-xl border border-slate-500/25 bg-black/20 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/45 hover:shadow-[0_0_20px_rgba(34,211,238,0.14)]"
          >
            {name}
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default TeamList
