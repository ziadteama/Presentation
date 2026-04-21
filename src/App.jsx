import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Activity, Camera, Eye, Route, Smartphone } from 'lucide-react'
import PresentationControls from './components/PresentationControls'
import ProgressBar from './components/ProgressBar'
import ProgressDots from './components/ProgressDots'
import Slide from './components/Slide'

const IntroSlide = lazy(() => import('./components/IntroSlide'))
const ArchitectureFlow = lazy(() => import('./components/ArchitectureFlow'))
const HardwareCards = lazy(() => import('./components/HardwareCards'))
const AlertSimulator = lazy(() => import('./components/AlertSimulator'))

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [started, setStarted] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [alertActive, setAlertActive] = useState(false)
  const wheelLockRef = useRef(false)

  const slides = useMemo(
    () => [
      {
        id: 'introduction',
        navLabel: 'Introduction',
        eyebrow: '01 / Introduction',
        title: 'Driver Inattention is Killing Millions',
        content: (
          <Suspense fallback={<div className="rounded-xl border border-current/20 p-6">Loading intro module...</div>}>
            <IntroSlide />
          </Suspense>
        ),
      },
      {
        id: 'motivation',
        navLabel: 'Motivation',
        eyebrow: '02 / Motivation',
        title: 'Global Crisis, Local Urgency',
        content: (
          <div className="space-y-5 text-lg text-current/82">
            <p>
              Road traffic incidents claim 1.19 million lives each year globally. In Egypt, 5,260 deaths were
              recorded in 2024, and human factors contribute around 64% of accidents.
            </p>
            <p>
              Physiologically, heart rate can drop by about 9% when a driver becomes sleepy, making multimodal
              fusion essential for early detection.
            </p>
          </div>
        ),
      },
      {
        id: 'literature-survey',
        navLabel: 'Literature',
        eyebrow: '03 / Literature Survey',
        title: 'Research Landscape',
        content: (
          <div className="grid grid-cols-4 gap-4">
            <article className="info-card rounded-xl border p-4">
              <h3 className="font-bold">Behavioral Cues</h3>
              <p className="mt-2 text-sm">Eye closure, yawning, blink rate, and head dynamics.</p>
            </article>
            <article className="info-card rounded-xl border p-4">
              <h3 className="font-bold">Physiological Cues</h3>
              <p className="mt-2 text-sm">Heart rate and HRV reflect internal fatigue state.</p>
            </article>
            <article className="info-card rounded-xl border p-4">
              <h3 className="font-bold">Vehicle-Based Cues</h3>
              <p className="mt-2 text-sm">Lane drift and steering behavior as external indicators.</p>
            </article>
            <article className="info-card rounded-xl border border-cyan-300/45 p-4">
              <h3 className="font-bold text-cyan-200">SOTA Result</h3>
              <p className="mt-2 text-sm">ResNet50V2 achieves 99.7% eye-state identification accuracy.</p>
            </article>
          </div>
        ),
      },
      {
        id: 'challenges',
        navLabel: 'Challenges',
        eyebrow: '04 / Challenges',
        title: 'Engineering Hurdles',
        content: (
          <ul className="grid grid-cols-2 gap-4">
            <li className="info-card rounded-xl border p-4">Lighting Sensitivity: poor night-scene performance.</li>
            <li className="info-card rounded-xl border p-4">Face Occlusion: sunglasses or masks hide critical cues.</li>
            <li className="info-card rounded-xl border p-4">Computational Complexity on edge devices.</li>
            <li className="info-card rounded-xl border p-4">User Comfort constraints in wearable sensing.</li>
          </ul>
        ),
      },
      {
        id: 'problem-statement',
        navLabel: 'Problem',
        eyebrow: '05 / Problem Statement',
        title: 'Critical Impairments Are Detected Too Late',
        content: (
          <p className="max-w-5xl text-xl leading-relaxed text-current/85">
            Driver impairments often go unnoticed until it is too late. Our DMS bridges this gap with continuous
            real-time detection and immediate intervention logic.
          </p>
        ),
      },
      {
        id: 'project-objectives',
        navLabel: 'Objectives',
        eyebrow: '06 / Project Objectives',
        title: 'SMART Targets',
        content: (
          <ul className="space-y-4 text-lg">
            <li className="info-card rounded-xl border border-emerald-300/35 p-4">
              Reach 85-90% accuracy for eyes, gaze, and phone-use detection.
            </li>
            <li className="info-card rounded-xl border border-emerald-300/35 p-4">
              Keep end-to-end latency below 500ms for in-vehicle deployment.
            </li>
          </ul>
        ),
      },
      {
        id: 'key-activities',
        navLabel: 'Activities',
        eyebrow: '07 / Key Activities',
        title: 'Core Services',
        content: (
          <div className="grid grid-cols-2 gap-4">
            {serviceCards.map((card) => {
              const Icon = card.icon

              return (
                <article key={card.title} className="info-card rounded-xl border p-4">
                  <div className="mb-3 inline-flex rounded-lg border border-cyan-300/25 bg-cyan-400/10 p-2 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm">{card.description}</p>
                </article>
              )
            })}
          </div>
        ),
      },
      {
        id: 'system-architecture',
        navLabel: 'Architecture',
        eyebrow: '08 / System Architecture',
        title: '6-Stage Inference Pipeline',
        content: (
          <Suspense fallback={<div className="rounded-xl border border-current/20 p-6">Loading architecture module...</div>}>
            <ArchitectureFlow />
          </Suspense>
        ),
      },
      {
        id: 'technical-phase',
        navLabel: 'Technical Phase',
        eyebrow: '09 / Technical Phase',
        title: 'Model & Sensor Stack',
        content: (
          <div className="grid grid-cols-3 gap-4">
            <article className="info-card rounded-xl border p-4">
              <div className="mb-2 inline-flex rounded-lg border border-cyan-300/25 bg-cyan-400/10 p-2 text-cyan-300">
                <Camera size={18} />
              </div>
              <h3 className="font-bold">Vision</h3>
              <p className="mt-2 text-sm">MediaPipe Face Mesh for very fast eye and head landmark extraction.</p>
            </article>
            <article className="info-card rounded-xl border p-4">
              <div className="mb-2 inline-flex rounded-lg border border-cyan-300/25 bg-cyan-400/10 p-2 text-cyan-300">
                <Smartphone size={18} />
              </div>
              <h3 className="font-bold">Object Detection</h3>
              <p className="mt-2 text-sm">YOLOv5 for high-accuracy phone-use detection.</p>
            </article>
            <article className="info-card rounded-xl border p-4">
              <div className="mb-2 inline-flex rounded-lg border border-cyan-300/25 bg-cyan-400/10 p-2 text-cyan-300">
                <Activity size={18} />
              </div>
              <h3 className="font-bold">Physiological</h3>
              <p className="mt-2 text-sm">Random Forest HR/HRV classification for internal-state inference.</p>
            </article>
          </div>
        ),
      },
      {
        id: 'design-constraints',
        navLabel: 'Constraints',
        eyebrow: '10 / Design Constraints',
        title: 'Deployment Boundaries',
        content: (
          <ul className="grid grid-cols-3 gap-4">
            <li className="info-card rounded-xl border p-4">Real-time processing constraints on edge hardware.</li>
            <li className="info-card rounded-xl border p-4">Operating envelope from -10C to 50C.</li>
            <li className="info-card rounded-xl border p-4">Privacy-first model: local processing, no cloud storage.</li>
          </ul>
        ),
      },
      {
        id: 'software-hardware',
        navLabel: 'Hardware',
        eyebrow: '11 / Software & Hardware',
        title: 'Edge-Ready Implementation',
        content: (
          <Suspense fallback={<div className="rounded-xl border border-current/20 p-6">Loading hardware module...</div>}>
            <HardwareCards />
          </Suspense>
        ),
      },
      {
        id: 'business-model',
        navLabel: 'Business',
        eyebrow: '12 / Business Model',
        title: 'B2B Go-To-Market Strategy',
        content: (
          <p className="max-w-5xl text-xl leading-relaxed text-current/85">
            The strategy targets Automotive OEMs and Commercial Fleets to reduce accident-related costs,
            lower insurance pressure, and improve operational safety performance.
          </p>
        ),
      },
      {
        id: 'ethics',
        navLabel: 'Ethics',
        eyebrow: '13 / Ethics',
        title: 'Responsible AI in Road Safety',
        content: (
          <ul className="space-y-4 text-lg">
            <li className="info-card rounded-xl border p-4">Privacy-by-Design with local inference and strict data boundaries.</li>
            <li className="info-card rounded-xl border p-4">Informed participant consent before data collection.</li>
            <li className="info-card rounded-xl border p-4">Dataset diversity including glasses and multiple age groups.</li>
          </ul>
        ),
      },
      {
        id: 'what-has-been-done',
        navLabel: 'Project I',
        eyebrow: '14 / Project I',
        title: 'What Has Been Done',
        content: (
          <ul className="space-y-4 text-lg">
            <li className="info-card rounded-xl border p-4">Comparison matrix benchmark against Cipia and Smart Eye.</li>
            <li className="info-card rounded-xl border p-4">SWOT and PESTLE strategic reports completed.</li>
            <li className="info-card rounded-xl border p-4">Data collection plan built with UTA-RLDD and WESAD datasets.</li>
          </ul>
        ),
      },
      {
        id: 'plan-for-project-ii',
        navLabel: 'Project II',
        eyebrow: '15 / Project II',
        title: 'Roadmap',
        content: (
          <div className="space-y-5">
            <ol className="space-y-3 text-lg">
              <li className="info-card rounded-xl border p-4">Finalize hardware integration and synchronized sensor timing.</li>
              <li className="info-card rounded-xl border p-4">Optimize models for AI HAT+ acceleration.</li>
              <li className="info-card rounded-xl border p-4">Run real-world testing on Egyptian roads.</li>
            </ol>
            <Suspense fallback={<div className="rounded-xl border border-current/20 p-4">Loading alert simulator...</div>}>
              <AlertSimulator alertActive={alertActive} onTrigger={() => setAlertActive(true)} />
            </Suspense>
          </div>
        ),
      },
    ],
    [alertActive],
  )

  const navigateTo = (nextIndex) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, nextIndex))
    if (clamped === currentSlide) {
      return
    }
    setDirection(clamped > currentSlide ? 1 : -1)
    setCurrentSlide(clamped)
  }

  const goNext = () => navigateTo(currentSlide + 1)
  const goPrev = () => navigateTo(currentSlide - 1)

  useEffect(() => {
    if (!started) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        goNext()
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [started, currentSlide])

  useEffect(() => {
    if (!autoplay || !started) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev >= slides.length - 1 ? 0 : prev + 1))
    }, 5200)

    return () => clearInterval(intervalId)
  }, [autoplay, started, slides.length])

  useEffect(() => {
    if (!alertActive) {
      return undefined
    }

    const timeout = setTimeout(() => setAlertActive(false), 2600)
    return () => clearTimeout(timeout)
  }, [alertActive])

  const handleWheel = (event) => {
    if (!started || wheelLockRef.current) {
      return
    }

    const threshold = 40
    if (Math.abs(event.deltaY) < threshold) {
      return
    }

    wheelLockRef.current = true
    if (event.deltaY > 0) {
      goNext()
    } else {
      goPrev()
    }

    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 620)
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      return
    }

    await document.exitFullscreen()
  }

  const progress = ((currentSlide + 1) / slides.length) * 100
  const current = slides[currentSlide]

  return (
    <div className={`presentation-root ${theme === 'light' ? 'theme-light' : 'theme-dark'}`} onWheel={handleWheel}>
      <div className="road-grid pointer-events-none fixed inset-0" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(56,189,248,0.24),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(248,113,113,0.2),transparent_32%),radial-gradient(circle_at_45%_100%,rgba(245,158,11,0.12),transparent_42%)]" />
      {alertActive ? <div className="alert-frame pointer-events-none fixed inset-0 z-50" /> : null}

      <ProgressBar progress={progress} />

      {!started ? (
        <div className="start-overlay fixed inset-0 z-50 flex items-center justify-center">
          <div className="start-panel w-full max-w-4xl rounded-3xl border p-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Graduation Project Presentation</p>
            <h1 className="mt-4 text-6xl font-black">Real-Time Multimodal DMS</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-current/80">
              A laptop-first interactive slide experience with keyboard navigation, animated transitions,
              live risk simulation, and full project content.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <button type="button" className="start-btn" onClick={() => setStarted(true)}>
                Start Presentation
              </button>
              <button
                type="button"
                className="start-btn-secondary"
                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              >
                Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {started ? (
        <>
          <ProgressDots slides={slides} current={currentSlide} onSelect={(index) => navigateTo(index)} />

          <div className="relative z-20 h-screen overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <Slide key={current.id} direction={direction} eyebrow={current.eyebrow} title={current.title}>
                {current.content}
              </Slide>
            </AnimatePresence>
          </div>

          <PresentationControls
            onPrev={goPrev}
            onNext={goNext}
            onToggleAutoplay={() => setAutoplay((prev) => !prev)}
            autoplay={autoplay}
            onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            theme={theme}
            onFullscreen={toggleFullscreen}
            current={currentSlide}
            total={slides.length}
          />
        </>
      ) : null}
    </div>
  )
}

export default App
