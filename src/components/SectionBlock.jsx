function SectionBlock({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} data-section-id={id} className={`reveal-section scroll-mt-24 ${className}`}>
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/65 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.45)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300/90">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-100 sm:text-3xl">{title}</h2>
        <div className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">{children}</div>
      </div>
    </section>
  )
}

export default SectionBlock
