import { motion } from 'framer-motion'

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 110 : -110,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -95 : 95,
    scale: 0.99,
    transition: {
      duration: 0.42,
      ease: [0.4, 0, 1, 1],
    },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function Slide({ direction, eyebrow, title, children }) {
  return (
    <motion.section
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="relative h-screen w-full px-20 py-20"
    >
      <div className="slide-card mx-auto flex h-full w-full max-w-7xl flex-col justify-center rounded-3xl border p-14">
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="slide-eyebrow text-xs font-bold uppercase tracking-[0.3em]"
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0.12}
          className="mt-4 text-5xl font-black leading-[1.12]"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0.18}
          className="mt-8"
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Slide
