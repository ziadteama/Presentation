import { Cpu, HeartPulse, ScanLine, ServerCog } from 'lucide-react'

const hardwareItems = [
  {
    name: 'Raspberry Pi 5',
    detail: 'Edge compute controller for real-time local processing.',
    icon: Cpu,
  },
  {
    name: 'AI HAT+ (26 TOPS)',
    detail: 'Accelerates model inference for robust multimodal analysis.',
    icon: ServerCog,
  },
  {
    name: 'IR Camera',
    detail: 'Improves night-time visibility for landmark extraction.',
    icon: ScanLine,
  },
  {
    name: 'Polar H10 (ECG-grade)',
    detail: 'Gold standard HRV signal quality with superior reliability vs optical sensors.',
    icon: HeartPulse,
    hover: 'ECG chest-strap sensing offers cleaner R-R intervals and fewer motion artifacts than optical wearables.',
  },
]

function HardwareCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {hardwareItems.map((item) => {
        const Icon = item.icon

        return (
          <article
            key={item.name}
            className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/85 p-5 transition hover:-translate-y-1 hover:border-cyan-400/55"
          >
            <div className="mb-3 inline-flex rounded-lg border border-cyan-400/35 bg-cyan-500/10 p-2 text-cyan-300">
              <Icon size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-100">{item.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
            {item.hover ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full border-t border-cyan-300/40 bg-slate-800/95 p-3 text-xs text-cyan-100 transition duration-300 group-hover:translate-y-0">
                {item.hover}
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}

export default HardwareCards
