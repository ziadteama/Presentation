import { useEffect, useState } from 'react'
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

function CrashChartTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const row = payload[0].payload

  return (
    <div className="rounded-xl border border-slate-500/35 bg-slate-950/95 px-3 py-2 shadow-[0_16px_45px_rgba(2,6,23,0.5)]">
      <p className="text-xs font-bold text-slate-200">{row.label}</p>
      <p className="mt-1 text-xs text-cyan-200">{row.display}</p>
    </div>
  )
}

function CrashImpactChart({ data }) {
  const [chartReady, setChartReady] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => setChartReady(true), 180)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="rounded-2xl border border-slate-500/25 bg-black/15 p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 8" stroke="rgba(148,163,184,0.2)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: 'currentColor', fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fill: 'currentColor', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Millions per year', angle: -90, position: 'insideLeft', fill: 'currentColor' }}
          />
          <Tooltip content={<CrashChartTooltip />} cursor={{ fill: 'rgba(34,211,238,0.08)' }} />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} isAnimationActive={chartReady} animationDuration={1200} animationEasing="ease-out">
            {data.map((row) => (
              <Cell key={row.key} fill={row.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CrashImpactChart
