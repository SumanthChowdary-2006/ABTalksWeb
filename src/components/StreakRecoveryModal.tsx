import { useState } from 'react'
import { fireConfetti } from '../utils/confetti'

interface StreakRecoveryModalProps {
  isOpen: boolean
  missedDayNumber: number
  availableFreezes: number
  onClose: () => void
  onRecoverSuccess: (method: 'freeze' | 'quiz') => void
}

export default function StreakRecoveryModal({
  isOpen,
  missedDayNumber,
  availableFreezes,
  onClose,
  onRecoverSuccess
}: StreakRecoveryModalProps) {
  const [activeTab, setActiveTab] = useState<'freeze' | 'quiz'>('freeze')
  const [quizAnswer, setQuizAnswer] = useState('')
  const [catchupGithub, setCatchupGithub] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!catchupGithub.trim()) {
      setError('Please provide your GitHub URL for the missed day.')
      return
    }
    if (!quizAnswer) {
      setError('Please answer the quick verification question.')
      return
    }

    fireConfetti()
    onRecoverSuccess('quiz')
    onClose()
  }

  const handleFreezeSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fireConfetti()
    onRecoverSuccess('freeze')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-t-3xl sm:rounded-2xl p-5 pb-20 sm:pb-6 shadow-2xl overflow-y-auto max-h-[92vh] overscroll-contain">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              ⚡
            </span>
            <div>
              <h3 className="text-sm font-black text-white">Streak Recovery Engine</h3>
              <p className="text-[10px] text-amber-300">Missed Day #{missedDayNumber} • 12-Day Streak in Danger</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 my-3 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('freeze'); }}
            className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              activeTab === 'freeze' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400'
            }`}
          >
            🛡️ Use Freeze ({availableFreezes})
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('quiz'); }}
            className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            ⚡ Catch-Up Quiz
          </button>
        </div>

        {/* Tab 1: Streak Freeze Option */}
        {activeTab === 'freeze' && (
          <div className="py-2 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl mx-auto mb-3">
              🛡️
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Instant Recovery via Streak Freeze</h4>
            <p className="text-[11px] text-slate-300 mb-4 leading-relaxed">
              Use 1 of your <strong className="text-amber-300">{availableFreezes} Streak Freeze</strong> tokens to instantly shield your 12-day streak without penalty.
            </p>
            <button
              type="button"
              onClick={handleFreezeSubmit}
              disabled={availableFreezes <= 0}
              className="w-full py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-lg disabled:opacity-50"
            >
              Apply Freeze & Protect Streak 🛡️
            </button>
          </div>
        )}

        {/* Tab 2: Catchup Submission + Quiz Option */}
        {activeTab === 'quiz' && (
          <form onSubmit={handleQuizSubmit} className="space-y-3 py-1">
            {error && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                Missed Day #{missedDayNumber} GitHub Link <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/catchup-day-12"
                value={catchupGithub}
                onChange={e => setCatchupGithub(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                Verification: What custom React hook prevents unnecessary re-renders when passing functions to child components?
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'useCallback', label: 'useCallback()' },
                  { id: 'useMemo', label: 'useMemo()' },
                  { id: 'useEffect', label: 'useEffect()' }
                ].map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                      quizAnswer === opt.id
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz"
                      value={opt.id}
                      checked={quizAnswer === opt.id}
                      onChange={() => setQuizAnswer(opt.id)}
                      className="accent-indigo-500"
                    />
                    <span className="font-mono text-[11px]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-black text-white grad-btn shadow-lg mt-2"
            >
              Submit Catch-Up & Earn Streak Back ⚡
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
