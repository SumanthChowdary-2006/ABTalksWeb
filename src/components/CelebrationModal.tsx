import { useEffect } from 'react'
import { fireConfetti } from '../utils/confetti'

interface CelebrationModalProps {
  isOpen: boolean
  dayNumber: number
  xpEarned?: number
  onClose: () => void
}

export default function CelebrationModal({
  isOpen,
  dayNumber,
  xpEarned = 100,
  onClose
}: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      fireConfetti()
      // Secondary celebration burst after 400ms
      const timer = setTimeout(() => fireConfetti(), 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn text-slate-100">
      <div className="w-full max-w-sm bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Big Trophy / Fire Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl animate-bounce">
          🔥
        </div>

        {/* Celebration Title */}
        <h2 className="text-2xl font-black tracking-tight text-white mb-1 uppercase">
          🎉 DAY {dayNumber} COMPLETED
        </h2>

        <p className="text-base font-extrabold text-amber-300 mb-4">
          Keep going legend 🔥
        </p>

        {/* XP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black mb-6">
          <span>⭐</span>
          <span>+{xpEarned} XP Claimed</span>
          <span>•</span>
          <span>Streak Intact ✓</span>
        </div>

        {/* Recruiter encouragement quote */}
        <p className="text-xs text-slate-400 leading-relaxed mb-6 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
          "94% of students who maintain a 15+ day streak receive interview callbacks from top tech startups."
        </p>

        {/* Close CTA */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-white text-sm grad-btn shadow-xl active:scale-95 transition-transform"
        >
          Continue Coding Sprint →
        </button>

      </div>
    </div>
  )
}
