import { useState, useEffect } from 'react'

interface GoalSettingWidgetProps {
  completedDays: number
}

export default function GoalSettingWidget({ completedDays }: GoalSettingWidgetProps) {
  const [targetDays, setTargetDays] = useState(() => {
    return parseInt(localStorage.getItem('abtalks_target_goal') || '30', 10)
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    localStorage.setItem('abtalks_target_goal', targetDays.toString())
  }, [targetDays])

  const goalProgress = Math.min(100, Math.round((completedDays / targetDays) * 100))

  return (
    <div className="rounded-2xl p-3.5 glass border border-emerald-500/20 shadow-xl space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
            🎯
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-100 truncate">Sprint Goal Tracker</h4>
            <p className="text-[10px] text-slate-400 truncate">Target: {targetDays} Projects Shipped</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20"
        >
          {isEditing ? 'Done' : 'Set Goal'}
        </button>
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2 py-1">
          <span className="text-xs text-slate-300 font-semibold">Target Days:</span>
          {[15, 30, 45, 60].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => {
                setTargetDays(num)
                setIsEditing(false)
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                targetDays === num ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-[10px] font-bold mb-1">
            <span className="text-slate-300">Goal Progress</span>
            <span className="text-emerald-400">{completedDays}/{targetDays} Days ({goalProgress}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
