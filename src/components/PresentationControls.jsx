import { Maximize, Moon, Pause, Play, Sun } from 'lucide-react'

function PresentationControls({
  onPrev,
  onNext,
  onToggleAutoplay,
  autoplay,
  onToggleTheme,
  theme,
  onFullscreen,
  current,
  total,
}) {
  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 w-full max-w-3xl -translate-x-1/2">
      <div className="controls-panel pointer-events-auto flex items-center justify-between rounded-2xl border px-4 py-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrev} className="control-btn">
            Prev
          </button>
          <button type="button" onClick={onNext} className="control-btn">
            Next
          </button>
        </div>

        <p className="text-sm font-semibold tracking-[0.14em] opacity-90">
          {current + 1} / {total}
        </p>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onToggleAutoplay} className="control-icon-btn" title="Toggle autoplay">
            {autoplay ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" onClick={onFullscreen} className="control-icon-btn" title="Fullscreen mode">
            <Maximize size={16} />
          </button>
          <button type="button" onClick={onToggleTheme} className="control-icon-btn" title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PresentationControls
