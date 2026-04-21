function ProgressDots({ slides, current, onSelect }) {
  return (
    <aside className="fixed right-8 top-1/2 z-40 -translate-y-1/2">
      <div className="dots-panel flex flex-col gap-3 rounded-2xl border px-3 py-4">
        {slides.map((slide, index) => {
          const isActive = index === current

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`dot group relative h-3 w-3 rounded-full transition ${isActive ? 'dot-active' : ''}`}
              title={slide.navLabel}
            >
              <span className="dot-label pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs group-hover:block">
                {slide.navLabel}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default ProgressDots
