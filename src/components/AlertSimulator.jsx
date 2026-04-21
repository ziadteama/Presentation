function AlertSimulator({ alertActive, onTrigger }) {
  return (
    <div className="rounded-2xl border border-red-400/50 bg-[linear-gradient(130deg,rgba(127,29,29,0.45),rgba(69,10,10,0.22))] p-5 shadow-[0_14px_40px_rgba(127,29,29,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-red-200">Trigger Alert Simulator</h3>
          <p className="text-sm text-red-100/80">
            Simulates prolonged eye closure workflow and emergency escalation logic.
          </p>
        </div>
        <button
          type="button"
          onClick={onTrigger}
          className="rounded-full border border-red-300/80 bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:scale-[1.03] hover:bg-red-400"
        >
          Trigger Alert
        </button>
      </div>
      <p className={`mt-4 rounded-lg border p-3 text-sm font-semibold ${alertActive ? 'border-red-300/70 bg-red-400/15 text-red-100' : 'border-slate-500/40 bg-black/20 text-slate-200'}`}>
        {alertActive
          ? 'Eye Closure Detected! Alerting Nearby Hospital...'
          : 'System idle: awaiting multimodal event trigger.'}
      </p>
    </div>
  )
}

export default AlertSimulator
