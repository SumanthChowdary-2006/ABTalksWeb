import { useState } from 'react'

const aiMotivations = [
  "🤖 AI Coach: 'Consistency beats intensity. One clean commit today positions you ahead of 90% of job applicants.'",
  "⚡ AI Insight: 'Day 12 builders who ship daily code to GitHub are 3.4x more likely to clear technical recruiter screens.'",
  "🚀 Daily Fuel: 'The best developers weren't born geniuses — they built 1 feature every single day without excuses.'",
  "💡 Pro Tip: 'Make your LinkedIn posts specific: mention the React hooks or API patterns you mastered today.'",
  "🎯 Mindset: 'You don't need 8 hours a day. You just need 45 focused minutes and 1 public repository commit.'"
]

export default function DailyMotivationWidget() {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex(prev => (prev + 1) % aiMotivations.length)
  }

  return (
    <div className="rounded-2xl p-3.5 bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950 border border-purple-500/30 shadow-xl flex items-start gap-3 relative overflow-hidden">
      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
        🤖
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-extrabold text-purple-300 uppercase tracking-widest flex items-center gap-1">
            <span>✨</span> Daily Motivation AI
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="text-[10px] text-purple-400 hover:text-white font-bold transition-colors"
          >
            Next Quote ↻
          </button>
        </div>
        <p className="text-xs text-slate-200 leading-snug font-sans italic">
          {aiMotivations[index]}
        </p>
      </div>
    </div>
  )
}
