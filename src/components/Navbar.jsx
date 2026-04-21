function Navbar({ sections, activeSection }) {
  return (
    <header className="sticky top-2 z-40 mx-auto mt-2 w-full max-w-screen-xl rounded-2xl border border-slate-700/80 bg-slate-950/80 px-3 shadow-[0_10px_35px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <nav className="flex gap-2 overflow-x-auto py-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`whitespace-nowrap rounded-xl border px-3 py-1 text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'border-cyan-400/70 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-cyan-100'
              }`}
            >
              {section.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
