import { useEffect, useState } from 'react'
import { Activity, Camera, Eye, Route, Smartphone } from 'lucide-react'
import AlertSimulator from './components/AlertSimulator'
import ArchitectureFlow from './components/ArchitectureFlow'
import HardwareCards from './components/HardwareCards'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import SectionBlock from './components/SectionBlock'
import { navSections } from './data/sections'

const serviceCards = [
  {
    title: 'PERCLOS Calculation',
    description: 'Tracks percentage of eye closure duration to quantify fatigue risk.',
    icon: Eye,
  },
  {
    title: 'Gaze Deviation Tracking',
    description: 'Monitors off-road attention shifts and head-pose drift in real time.',
    icon: Route,
  },
  {
    title: 'Phone-Use Detection',
    description: 'Detects handheld phone interaction while driving using object cues.',
    icon: Smartphone,
  },
  {
    title: 'HRV Analysis',
    description: 'Classifies internal state for cross-verification with behavioral signals.',
    icon: Activity,
  },
]

function App() {
  const [activeSection, setActiveSection] = useState(navSections[0].id)
  const [progress, setProgress] = useState(0)
  const [alertActive, setAlertActive] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            setActiveSection(entry.target.getAttribute('id'))
          }
        })
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0.15 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!alertActive) {
      return undefined
    }

    const timeout = setTimeout(() => setAlertActive(false), 2600)
    return () => clearTimeout(timeout)
  }, [alertActive])

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(248,113,113,0.16),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.14),transparent_42%)]" />
      {alertActive ? <div className="alert-frame pointer-events-none fixed inset-0 z-50" /> : null}

      <ProgressBar progress={progress} />
      <Navbar sections={navSections} activeSection={activeSection} />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        <SectionBlock
          id="introduction"
          eyebrow="01 / Introduction"
          title="A Multimodal Safety Shield."
        >
          <p>
            A real-time Driver Monitoring System that detects fatigue, distraction, and reduced attention
            using vision-based behavioral sensing and physiological heart-rate monitoring.
          </p>
        </SectionBlock>

        <SectionBlock id="motivation" eyebrow="02 / Motivation" title="Global Crisis, Local Urgency">
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-2xl font-black text-amber-300">1.19M</p>
              <p>Annual road deaths worldwide.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-2xl font-black text-red-300">5,260</p>
              <p>Deaths in Egypt (2024), with 64% linked to human factors.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-2xl font-black text-cyan-300">-9%</p>
              <p>Heart-rate drop observed when drivers become sleepy.</p>
            </article>
          </div>
        </SectionBlock>

        <SectionBlock id="literature-survey" eyebrow="03 / Literature Survey" title="Research Landscape">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <h3 className="font-bold text-slate-100">Behavioral Cues</h3>
              <p className="mt-2 text-sm">Eye closure, yawning, blink rate, and head dynamics.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <h3 className="font-bold text-slate-100">Physiological Cues</h3>
              <p className="mt-2 text-sm">Heart rate and HRV reflect internal fatigue state.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <h3 className="font-bold text-slate-100">Vehicle-Based Cues</h3>
              <p className="mt-2 text-sm">Lane drift and steering behavior as external indicators.</p>
            </article>
            <article className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 p-4">
              <h3 className="font-bold text-cyan-100">SOTA Result</h3>
              <p className="mt-2 text-sm">ResNet50V2 reaches 99.7% eye-state identification accuracy.</p>
            </article>
          </div>
        </SectionBlock>

        <SectionBlock id="challenges" eyebrow="04 / Challenges" title="Engineering Hurdles">
          <ul className="grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Lighting Sensitivity: weak night-scene performance.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Face Occlusion: sunglasses and masks disrupt landmarks.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Computational Complexity on edge devices.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">User Comfort constraints in wearable sensing.</li>
          </ul>
        </SectionBlock>

        <SectionBlock
          id="problem-statement"
          eyebrow="05 / Problem Statement"
          title="Critical Impairments Are Detected Too Late"
        >
          <p>
            Driver impairment often goes unnoticed until a dangerous moment. Our system closes this gap through
            continuous real-time detection and immediate intervention logic.
          </p>
        </SectionBlock>

        <SectionBlock id="project-objectives" eyebrow="06 / Project Objectives" title="SMART Targets">
          <ul className="space-y-3">
            <li className="rounded-xl border border-emerald-300/35 bg-emerald-500/10 p-4">
              Achieve 85-90% detection accuracy for eyes, gaze, and phone use.
            </li>
            <li className="rounded-xl border border-emerald-300/35 bg-emerald-500/10 p-4">
              Maintain end-to-end latency below 500ms for practical in-vehicle deployment.
            </li>
          </ul>
        </SectionBlock>

        <SectionBlock id="key-activities" eyebrow="07 / Key Activities" title="Core Services">
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((card) => {
              const Icon = card.icon

              return (
                <article key={card.title} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                  <div className="mb-3 inline-flex rounded-lg bg-cyan-400/15 p-2 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-100">{card.title}</h3>
                  <p className="mt-2 text-sm">{card.description}</p>
                </article>
              )
            })}
          </div>
        </SectionBlock>

        <SectionBlock id="system-architecture" eyebrow="08 / System Architecture" title="6-Stage Inference Pipeline">
          <ArchitectureFlow />
        </SectionBlock>

        <SectionBlock id="technical-phase" eyebrow="09 / Technical Phase" title="Model & Sensor Stack">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
                <Camera size={18} />
              </div>
              <h3 className="font-bold text-slate-100">Vision</h3>
              <p className="mt-2 text-sm">MediaPipe Face Mesh for very fast eye and head landmark extraction.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
                <Smartphone size={18} />
              </div>
              <h3 className="font-bold text-slate-100">Object Detection</h3>
              <p className="mt-2 text-sm">YOLOv5 for high-accuracy phone-use event detection.</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
                <Activity size={18} />
              </div>
              <h3 className="font-bold text-slate-100">Physiological</h3>
              <p className="mt-2 text-sm">Random Forest HR/HRV classification for internal-state inference.</p>
            </article>
          </div>
        </SectionBlock>

        <SectionBlock id="design-constraints" eyebrow="10 / Design Constraints" title="Deployment Boundaries">
          <ul className="grid gap-3 sm:grid-cols-3">
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Real-time processing constraints on edge hardware.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Operating envelope from -10C to 50C.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Privacy-first: local processing, no cloud storage.</li>
          </ul>
        </SectionBlock>

        <SectionBlock id="software-hardware" eyebrow="11 / Software & Hardware" title="Edge-Ready Implementation">
          <HardwareCards />
        </SectionBlock>

        <SectionBlock id="business-model" eyebrow="12 / Business Model" title="B2B Go-To-Market Strategy">
          <p>
            The deployment model targets Automotive OEMs and Commercial Fleets, focusing on reduced accident-related
            losses, lower insurance expenses, and measurable operational safety gains.
          </p>
        </SectionBlock>

        <SectionBlock id="ethics" eyebrow="13 / Ethics" title="Responsible AI in Road Safety">
          <ul className="space-y-3">
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Privacy-by-Design and local inference safeguards.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Informed participant consent before data collection.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Dataset diversity across age groups and eyewear conditions.</li>
          </ul>
        </SectionBlock>

        <SectionBlock id="what-has-been-done" eyebrow="14 / Project I" title="What Has Been Done">
          <ul className="space-y-3">
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Comparison matrix benchmarking against Cipia and Smart Eye.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Strategic groundwork with SWOT and PESTLE reports.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Data collection plan using UTA-RLDD and WESAD datasets.</li>
          </ul>
        </SectionBlock>

        <SectionBlock id="plan-for-project-ii" eyebrow="15 / Project II" title="Roadmap">
          <ol className="space-y-3">
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Finalize full hardware integration and synchronized sensor timing.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Optimize inference workloads for AI HAT+ acceleration.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">Run real-world validation on Egyptian roads and evaluate alert outcomes.</li>
          </ol>
          <div className="mt-6">
            <AlertSimulator alertActive={alertActive} onTrigger={() => setAlertActive(true)} />
          </div>
        </SectionBlock>
      </main>
    </div>
  )
}

export default App
