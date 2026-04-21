import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle } from 'lucide-react'
import CrashImpactChart from './charts/CrashImpactChart'
import { crashBarData, globalCrashStats } from '../data/globalCrashStats'

function CountUp({ value, suffix = '', decimals = 0, duration = 1200 }) {
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

  return `${current.toFixed(decimals)}${suffix}`
}

function GlobalStatisticsSlide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid h-full grid-cols-[0.92fr_1.08fr] gap-8"
    >
      <div className="flex flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-300/30 bg-red-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-red-200">
          <AlertTriangle size={14} />
          Global Safety Burden
        </div>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          Road crashes remain one of the biggest preventable causes of death and injury, with fatigue and
          distraction as major human-factor triggers.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4">
          <article className="hud-chip rounded-2xl border p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Annual deaths</p>
            <p className="mt-2 text-3xl font-black text-red-300">
              <CountUp value={globalCrashStats.annualDeaths} decimals={2} suffix="M" />
            </p>
          </article>
          <article className="hud-chip rounded-2xl border p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Annual injuries</p>
            <p className="mt-2 text-3xl font-black text-cyan-300">
              <CountUp value={globalCrashStats.annualInjuriesMin} suffix="M" /> -
              <CountUp value={globalCrashStats.annualInjuriesMax} suffix="M" />
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
            <Activity size={14} />
            Human factors
          </div>
          <p>{globalCrashStats.humanFactorsNote}</p>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Source: World Health Organization (WHO)
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <CrashImpactChart data={crashBarData} />
      </div>
    </motion.div>
  )
}

export default GlobalStatisticsSlide
