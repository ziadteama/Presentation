import { motion } from 'framer-motion'
import SupervisorSection from './intro/SupervisorSection'
import TeamList from './intro/TeamList'
import TitleSection from './intro/TitleSection'

const presentedBy = [
  'Omar Khalifa',
  'Ziad Hesham',
  'Omar Deyaa',
  'Malek Ahmed',
  'Youssef Medhat',
]

function IntroSlide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full items-center justify-center"
    >
      <motion.div
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(56,189,248,0.2),transparent_38%),radial-gradient(circle_at_75%_85%,rgba(245,158,11,0.16),transparent_38%)]"
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center">
        <TitleSection
          title="Real-Time Driver Monitoring System"
          subtitle="Enhancing Road Safety باستخدام الذكاء الاصطناعي"
        />
        <TeamList names={presentedBy} />
        <SupervisorSection name="Dr. Emad Elsamahy" />
      </div>
    </motion.div>
  )
}

export default IntroSlide
