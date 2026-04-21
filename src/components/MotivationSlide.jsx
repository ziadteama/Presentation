import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Eye, ShieldAlert, Sparkles } from 'lucide-react'
import StepCard from './motivation/StepCard'
import { motivationSteps } from '../data/motivationSteps'

const iconMap = {
  problem: Eye,
  cause: Brain,
  risk: ShieldAlert,
  solution: Sparkles,
}

function MotivationSlide() {
  const [activeStepId, setActiveStepId] = useState('solution')

  const activeStep = useMemo(
    () => motivationSteps.find((step) => step.id === activeStepId) ?? motivationSteps[0],
    [activeStepId],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="grid h-full grid-cols-[0.82fr_1.18fr] gap-8"
    >
      <div className="flex flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-200">
          <ShieldAlert size={14} />
          Why this matters
        </div>

        <h3 className="mt-6 text-4xl font-black leading-tight text-white">Motivation</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
          Current crashes are driven by distraction, human behavior, and delayed reaction. This project matters
          because real-time detection can stop the chain before impact.
        </p>

        <div className="mt-7 rounded-2xl border border-slate-500/20 bg-black/15 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Active step</p>
          <h4 className="mt-2 text-xl font-black text-white">{activeStep.label}: {activeStep.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeStep.description}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          {motivationSteps.map((step, index) => {
            const Icon = iconMap[step.id]
            const isActive = activeStepId === step.id

            return (
              <div key={step.id} className="relative">
                <StepCard
                  step={step}
                  icon={Icon}
                  active={isActive}
                  index={index}
                  onClick={() => setActiveStepId(step.id)}
                />

                {index < motivationSteps.length - 1 ? (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.35, delay: 0.12 + index * 0.06 }}
                    className="absolute -right-3 top-1/2 hidden h-0.5 w-6 origin-left bg-linear-to-r from-slate-400/70 to-cyan-300/70 xl:block"
                  />
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm leading-relaxed text-emerald-100">
          <p className="font-bold uppercase tracking-[0.18em] text-emerald-200">Final takeaway</p>
          <p className="mt-2">Real-time multimodal monitoring is the practical solution that links vision and physiology into one prevention system.</p>
        </div>
      </div>
    </motion.div>
  )
}

export default MotivationSlide
