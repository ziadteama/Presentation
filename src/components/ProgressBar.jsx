function ProgressBar({ progress }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-black/25">
      <div
        className="h-full bg-[linear-gradient(90deg,#22d3ee_0%,#f59e0b_55%,#ef4444_100%)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
