interface DeveloperDnaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeveloperDnaModal({ isOpen, onClose }: DeveloperDnaModalProps) {
  if (!isOpen) return null

  const dnaTraits = [
    { label: 'Primary Archetype', val: 'Fullstack React Specialist', color: '#818cf8', icon: '💻' },
    { label: 'Coding Pace', val: 'Night Owl Builder (10 PM Shipper)', color: '#fbbf24', icon: '🌙' },
    { label: 'Code Quality Score', val: '94% (Clean Components)', color: '#34d399', icon: '✨' },
    { label: 'Consistency Rating', val: 'Top 5% Unbroken Streak', color: '#f472b6', icon: '🔥' },
    { label: 'Recruiter Readiness', val: '88% High Placement Match', color: '#60a5fa', icon: '🎯' },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-t-3xl sm:rounded-2xl p-5 pb-20 sm:pb-6 shadow-2xl overflow-y-auto max-h-[92vh] overscroll-contain">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              🧬
            </span>
            <div>
              <h3 className="text-sm font-black text-white">Developer DNA Profile</h3>
              <p className="text-[10px] text-indigo-300">AI-Analyzed Student Coding Pattern</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* DNA Graphic Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="text-3xl mb-1">🧬</div>
          <h4 className="text-sm font-black text-white">Sumanth's Tech DNA</h4>
          <p className="text-[11px] text-slate-300 mt-1">
            "High-velocity React & AI builder with consistent evening shipping habits."
          </p>
        </div>

        {/* DNA Traits List */}
        <div className="space-y-2.5">
          {dnaTraits.map(t => (
            <div key={t.label} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base">{t.icon}</span>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-semibold block">{t.label}</span>
                  <span className="text-xs font-bold truncate block" style={{ color: t.color }}>{t.val}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
