import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Boxes,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  Gauge,
  Globe2,
  HeartPulse,
  Layers3,
  Route,
  ShieldAlert,
  Settings2,
  Sparkles,
  Users,
} from 'lucide-react'
import SectionCard from './SectionCard'

const slideItems = [
  { id: 1, title: 'Introduction', subtitle: 'Hook and project context.', icon: Sparkles },
  { id: 2, title: 'Motivation', subtitle: 'Global and Egypt road safety stats.', icon: Globe2 },
  { id: 3, title: 'Problem Statement', subtitle: 'Current safety gap in monitoring.', icon: ShieldAlert },
  { id: 4, title: 'Objective', subtitle: 'Goals and measurable targets.', icon: ClipboardList },
  { id: 5, title: 'Literature Review', subtitle: 'Behavioral, physiological, and vehicle cues.', icon: FileText },
  { id: 6, title: 'Key Activities', subtitle: 'Detection services and signal logic.', icon: Boxes },
  { id: 7, title: 'Challenges', subtitle: 'Occlusion, lighting, and edge limits.', icon: Gauge },
  { id: 8, title: 'System Architecture', subtitle: 'Pipeline from sensing to alerting.', icon: Layers3 },
  { id: 9, title: 'Technical Description', subtitle: 'Models and implementation details.', icon: Brain },
  { id: 10, title: 'Software/Hardware Requirements', subtitle: 'Pi 5, AI HAT+, IR camera, Polar H10.', icon: Settings2 },
  { id: 11, title: 'Business Model', subtitle: 'B2B strategy for OEMs and fleets.', icon: BriefcaseBusiness },
  { id: 12, title: 'Ethics', subtitle: 'Privacy, consent, and diversity.', icon: HeartPulse },
  { id: 13, title: 'What has been done in Project 1', subtitle: 'Benchmarking and planning outputs.', icon: Users },
  { id: 14, title: 'Plan for Project 2', subtitle: 'Integration, optimization, field testing.', icon: Route },
]

const groups = [
  { key: 'group-1', label: 'Group 1', range: 'Introduction - Challenges', from: 1, to: 7 },
  { key: 'group-2', label: 'Group 2', range: 'System Architecture - Project 2', from: 8, to: 14 },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
}

function TableOfContentsSlide() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeGroup, setActiveGroup] = useState(groups[0].key)

  const activeItem = useMemo(() => slideItems[activeIndex], [activeIndex])
  const currentGroup = useMemo(
    () => groups.find((group) => group.key === activeGroup) ?? groups[0],
    [activeGroup],
  )
  const visibleItems = useMemo(
    () => slideItems.filter((item) => item.id >= currentGroup.from && item.id <= currentGroup.to),
    [currentGroup],
  )

  return (
    <div className="grid h-full grid-cols-[0.92fr_1.08fr] gap-8">
      <div className="flex h-full flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-cyan-200">
          <ArrowRight size={14} />
          Slide 2 / Roadmap
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 text-4xl font-black leading-tight text-white"
        >
          Presentation Overview
        </motion.h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
          The roadmap is split into two compact groups to keep all sections clean and readable.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-500/20 bg-black/15 p-5 shadow-[0_10px_25px_rgba(2,6,23,0.25)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Current preview</p>
          <h4 className="mt-2 text-xl font-black text-white">{activeItem.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeItem.subtitle}</p>
          <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <span>2 / 15</span>
            <span className="h-px flex-1 bg-slate-600/40" />
            <span>Upcoming section</span>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col justify-center">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Presentation sections</p>
          <div className="inline-flex rounded-xl border border-slate-500/20 bg-black/15 p-1">
            {groups.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => setActiveGroup(group.key)}
                className={`rounded-lg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                  activeGroup === group.key
                    ? 'bg-cyan-400/20 text-cyan-200'
                    : 'text-slate-300 hover:bg-slate-800/70'
                }`}
                title={group.range}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{currentGroup.range}</p>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="toc-scroll-area" style={{ maxHeight: '62vh', overflowY: 'auto', paddingRight: '6px' }}>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {visibleItems.map((item) => {
              const isActive = slideItems[activeIndex]?.id === item.id

              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
                  }}
                >
                  <SectionCard
                    icon={item.icon}
                    title={item.title}
                    active={isActive}
                    index={item.id}
                    onClick={() => setActiveIndex(item.id - 1)}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TableOfContentsSlide
