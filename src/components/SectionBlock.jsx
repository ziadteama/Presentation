function SectionBlock({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} data-section-id={id} className={`reveal-section scroll-mt-28 ${className}`}>
      <div className="rounded-3xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(2,6,23,0.95))] p-9 shadow-[0_28px_80px_rgba(2,6,23,0.68)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-100">{title}</h2>
        <div className="mt-6 text-base leading-relaxed text-slate-300">{children}</div>
      </div>
    </section>
  )
}

export default SectionBlock
