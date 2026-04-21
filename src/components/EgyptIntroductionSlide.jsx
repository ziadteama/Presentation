import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, HeartPulse } from 'lucide-react'
import EgyptCauseDonutChart from './charts/EgyptCauseDonutChart'
import StatCard from './introduction/StatCard'
import { egyptCauseBreakdown, egyptIntroductionStats } from '../data/egyptIntroductionStats'

function CountUp({ value, duration = 1200 }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let frameId
    const start = performance.now()

    const step = (now) => {
      const ratio = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - ratio) * (1 - ratio)
      setCurrent(value * eased)
      if (ratio < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [value, duration])

  return current.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function EgyptIntroductionSlide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid h-full grid-cols-[0.95fr_1.05fr] gap-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-8 top-24 h-44 w-44 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute left-28 bottom-20 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-10 top-20 h-48 w-48 rounded-full bg-cyan-400/18 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-red-300/30 bg-red-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-200"
        >
          <AlertTriangle size={14} />
          Egypt Focus
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.1 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300"
        >
          In 2024, Egypt recorded 5,260 deaths and over 76,000 injuries due to road accidents.
          Driver fatigue and distraction contribute to 64% of road accidents in Egypt.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
          }}
          className="mt-7 grid grid-cols-2 gap-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <StatCard label="Deaths in Egypt (2024)" value={<CountUp value={egyptIntroductionStats.deaths} />} tone="red">
              Fatal road crashes continue to put families under severe pressure.
            </StatCard>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <StatCard label="Injuries in Egypt (2024)" value={<><CountUp value={egyptIntroductionStats.injuries} />+</>} tone="cyan">
              Non-fatal incidents still carry long-term social and health burden.
            </StatCard>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.36 }}
          className="mt-6 rounded-2xl border border-amber-300/35 bg-amber-400/12 p-4"
        >
          <div className="flex items-center gap-2">
            <HeartPulse size={16} className="text-amber-200" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">Human factor burden</p>
          </div>
          <p className="mt-2 text-5xl font-black leading-none text-amber-100 drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]">
            {egyptIntroductionStats.humanFactorPercent}%
          </p>
        </motion.div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Source: National road safety reports (Egypt)
        </p>
      </div>

      <div className="relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
          className="rounded-2xl border border-slate-500/20 bg-black/10 p-5"
        >
          <h3 className="text-lg font-black text-white">Primary Accident Causes in Egypt</h3>
          <p className="mt-1 text-sm text-slate-300">Fatigue and distraction vs other causes</p>
          <div className="mt-4">
            <EgyptCauseDonutChart data={egyptCauseBreakdown} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-red-300/30 bg-red-400/10 p-3 text-red-100">
              <p className="font-bold">64%</p>
              <p className="mt-1">Fatigue + Distraction</p>
            </div>
            <div className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 p-3 text-cyan-100">
              <p className="font-bold">36%</p>
              <p className="mt-1">Other causes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EgyptIntroductionSlide
