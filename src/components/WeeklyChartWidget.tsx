export default function WeeklyChartWidget() {
  const weekDays = [
    { day: 'Mon', count: 1, active: true },
    { day: 'Tue', count: 1, active: true },
    { day: 'Wed', count: 1, active: true },
    { day: 'Thu', count: 1, active: true },
    { day: 'Fri', count: 1, active: true },
    { day: 'Sat', count: 1, active: true },
    { day: 'Sun', count: 1, active: true },
  ]

  return (
    <div className="rounded-2xl p-4 glass border border-white/10 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
            📈
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-100">Weekly Activity Graph</h4>
            <p className="text-[10px] text-slate-400">7/7 Days Active This Week</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          100% Perfect Week 🔥
        </span>
      </div>

      {/* Interactive Bar Chart Graph */}
      <div className="flex items-end justify-between gap-2 pt-2 px-1 h-24 border-b border-slate-800 pb-2">
        {weekDays.map(d => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-500 group-hover:to-purple-400 transition-all relative"
              style={{ height: `${d.count * 80}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-lg transition-opacity whitespace-nowrap border border-slate-700">
                1 Project Shipped
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
              {d.day}
            </span>
          </div>
        ))}
      </div>

      {/* Smart Streak Prediction Box 🧠 */}
      <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl flex-shrink-0">🧠</span>
          <div className="min-w-0">
            <h5 className="text-[11px] font-bold text-indigo-300 truncate">Smart Streak Prediction</h5>
            <p className="text-[10px] text-slate-400 truncate">
              Estimated Completion: <strong className="text-emerald-400">Sept 30, 2026</strong> • Offer Odds: <strong className="text-amber-300">96% High</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
