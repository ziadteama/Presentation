function Navbar({ sections, activeSection }) {
  return (
    <header className="sticky top-1 z-40 border-b border-slate-700/70 bg-slate-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all sm:text-sm ${
                isActive
                  ? 'bg-cyan-400/20 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.25)]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-cyan-200'
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
