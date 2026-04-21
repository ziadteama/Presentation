function ProgressBar({ progress }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-slate-900/70">
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-amber-300 to-red-500 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
