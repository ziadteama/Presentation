import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0].payload

  return (
    <div className="rounded-xl border border-slate-500/35 bg-slate-950/95 px-3 py-2 shadow-[0_14px_35px_rgba(2,6,23,0.5)]">
      <p className="text-xs font-bold text-slate-100">{item.label}</p>
      <p className="mt-1 text-xs text-cyan-200">{item.display}</p>
    </div>
  )
}

function EgyptCauseDonutChart({ data }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => setReady(true), 140)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="rounded-2xl border border-slate-500/25 bg-black/15 p-4">
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={82}
            outerRadius={128}
            paddingAngle={2}
            isAnimationActive={ready}
            animationDuration={1100}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.color} stroke="rgba(15,23,42,0.8)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EgyptCauseDonutChart
