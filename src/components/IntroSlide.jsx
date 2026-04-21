import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowUpRight, MoonStar, Sparkles } from 'lucide-react'

const chartData = [
  {
    name: 'Annual road deaths',
    visual: 100,
    display: '1.19M',
    caption: 'Global annual fatalities',
    color: '#22d3ee',
  },
  {
    name: 'Fatal crashes with drowsy driving',
    visual: 72,
    display: '17.6%',
    caption: 'Share of fatal crashes',
    color: '#f59e0b',
  },
]

const focusCards = [
  {
    key: 'sleep',
    title: 'Driver sleep',
    metric: '17.6%',
    note: 'Drowsiness is the fastest route to a critical lapse.',
  },
  {
    key: 'distraction',
    title: 'Gaze deviation',
    metric: 'Major factor',
    note: 'Looking away from the road is the other core threat.',
  },
  {
    key: 'scale',
    title: 'Global impact',
    metric: '1.19M',
    note: 'The scale of the road-safety problem is already massive.',
  },
]

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

function IntroTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-slate-500/40 bg-slate-950/95 px-4 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">{label}</p>
      <p className="mt-1 text-sm text-slate-200">{payload[0].payload.display}</p>
      <p className="mt-1 text-xs text-slate-400">{payload[0].payload.caption}</p>
    </div>
  )
}

function IntroSlide() {
  const [chartReady, setChartReady] = useState(false)
  const [activeFocus, setActiveFocus] = useState('sleep')

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setChartReady(true))
    return () => cancelAnimationFrame(frameId)
  }, [])

  const activeCard = useMemo(
    () => focusCards.find((card) => card.key === activeFocus) ?? focusCards[0],
    [activeFocus],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid h-full grid-cols-[1.05fr_1fr] gap-10"
    >
      <div className="flex flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-cyan-200">
          <Sparkles size={14} />
          Intro / Hook
        </div>

        <p className="mt-7 max-w-2xl text-xl leading-relaxed text-current/82">
          Driver sleep and gaze deviation are the first warning signals. If we miss them, the crash happens
          faster than the driver can react.
        </p>

        <div className="mt-9 grid grid-cols-3 gap-4">
          <article className="hud-chip rounded-2xl border p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Annual road deaths</p>
            <p className="mt-2 text-3xl font-black text-amber-300">
              <CountUp value={1.19} decimals={2} suffix="M" />
            </p>
          </article>
          <article className="hud-chip rounded-2xl border p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Drowsy fatal crashes</p>
            <p className="mt-2 text-3xl font-black text-orange-300">
              <CountUp value={17.6} decimals={1} suffix="%" />
            </p>
          </article>
          <article className="hud-chip rounded-2xl border p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Risk posture</p>
            <p className="mt-2 text-3xl font-black text-cyan-300">High</p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {focusCards.map((card) => {
            const isActive = activeFocus === card.key
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => setActiveFocus(card.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'border-cyan-300/70 bg-cyan-400/15 text-cyan-100'
                    : 'border-slate-600/60 bg-black/15 text-slate-300 hover:border-slate-400 hover:bg-black/25'
                }`}
              >
                {card.title}
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeCard.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 rounded-2xl border border-slate-500/30 bg-black/15 p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Spotlight</p>
              <h3 className="mt-1 text-lg font-black text-white">{activeCard.title}</h3>
            </div>
            <ArrowUpRight className="text-cyan-300" size={18} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeCard.note}</p>
        </motion.div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Source: WHO & Global Road Safety Data
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-2 bottom-8 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl"
        />

        <div className="w-full rounded-[28px] border border-slate-500/25 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.96))] p-6 shadow-[0_28px_90px_rgba(2,6,23,0.46)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Crash pressure snapshot</p>
              <h3 className="mt-1 text-xl font-black text-white">Mixed-unit emphasis chart</h3>
            </div>
            <MoonStar className="text-amber-300" size={18} />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-500/20 bg-black/15 p-4">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 8" stroke="rgba(148,163,184,0.18)" vertical={false} />
                <XAxis
                  type="number"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  stroke="rgba(148,163,184,0.45)"
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Presentation emphasis', position: 'insideBottom', offset: -2, fill: 'currentColor' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: 'currentColor', fontSize: 13, fontWeight: 700 }}
                  width={165}
                  stroke="rgba(148,163,184,0.45)"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<IntroTooltip />} cursor={{ fill: 'rgba(34,211,238,0.08)' }} />
                <Bar dataKey="visual" radius={[0, 14, 14, 0]} isAnimationActive={chartReady} animationDuration={1300} animationEasing="ease-out">
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} fillOpacity={0.95} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-500/20 bg-black/15 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Chart takeaway</p>
              <p className="mt-2">The numbers are precise. The scale is tuned for presentation impact.</p>
            </div>
            <div className="rounded-2xl border border-slate-500/20 bg-black/15 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Extra focus</p>
              <p className="mt-2">Distraction and gaze deviation remain the other major accident path we will track.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default IntroSlide
