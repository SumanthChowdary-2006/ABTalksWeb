import { useState } from 'react'
import { fireConfetti } from '../utils/confetti'
import { UserStats } from '../data/challengesData'

export type { UserStats }

interface UserProfileModalProps {
  isOpen: boolean
  userStats: UserStats
  onClose: () => void
  onUpdateUserStats?: (updated: UserStats) => void
}

export default function UserProfileModal({
  isOpen,
  userStats,
  onClose,
  onUpdateUserStats
}: UserProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [collegeInput, setCollegeInput] = useState(userStats.college || 'Parul University')
  const [groupInput, setGroupInput] = useState(userStats.studyGroup || 'AI & Machine Learning (AIML)')
  const [nameInput, setNameInput] = useState(userStats.name || 'Sumanth')
  const [toastMsg, setToastMsg] = useState('')

  if (!isOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const updated: UserStats = {
      ...userStats,
      name: nameInput,
      college: collegeInput,
      studyGroup: groupInput
    }
    onUpdateUserStats?.(updated)
    setIsEditing(false)
    fireConfetti()
    setToastMsg('✓ Student Profile Updated & Saved!')
    setTimeout(() => setToastMsg(''), 3000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xl animate-fadeIn text-neutral-100">
      <div className="w-full max-w-md bg-neutral-900/95 border border-white/15 rounded-t-[32px] sm:rounded-[32px] p-6 pb-24 sm:pb-6 shadow-2xl overflow-y-auto max-h-[90vh] animate-sheet">
        {/* iOS Drag Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-[#0a84ff]/20 text-[#0a84ff] flex items-center justify-center font-bold text-sm">
              👤
            </span>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">Student Profile Card</h3>
              <p className="text-[11px] text-neutral-400">ABTalks 60-Day Coding Sprint</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
            className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold text-xs active:scale-95 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="my-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center animate-bounce">
            {toastMsg}
          </div>
        )}

        {/* Profile Avatar & Hero Info */}
        <div className="text-center py-4 relative border-b border-slate-800">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xl text-white shadow-xl border-2 border-white/20">
              {userStats.name.slice(0, 2).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-md" title="Active Daily Shipper" />
          </div>

          <h3 className="text-lg font-black text-white flex items-center justify-center gap-1.5">
            <span>{userStats.name}</span>
            <span className="text-xs font-normal text-slate-400">(@{userStats.username})</span>
          </h3>
          <p className="text-xs font-semibold text-indigo-400 mt-0.5">
            Student @ {userStats.college || 'Parul University'}
          </p>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="mt-2.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-all"
          >
            {isEditing ? 'Cancel Edit' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Edit Form Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3 py-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Student Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">College Name</label>
              <input
                type="text"
                value={collegeInput}
                onChange={e => setCollegeInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Current Study Group</label>
              <input
                type="text"
                value={groupInput}
                onChange={e => setGroupInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-black text-white grad-btn shadow-lg mt-2"
            >
              Save Profile Changes ✓
            </button>
          </form>
        ) : (
          /* View Mode Details Cards */
          <div className="py-3 space-y-2.5">
            
            {/* College & Group Info */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span>🏫</span> College Name
                </span>
                <span className="font-bold text-white">{userStats.college || 'Parul University'}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span>🧠</span> Study Group
                </span>
                <span className="font-bold text-indigo-300">{userStats.studyGroup || 'AI & Machine Learning (AIML)'}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span>📅</span> Date Joined ABTalks
                </span>
                <span className="font-bold text-emerald-400">{userStats.dateJoined || 'Aug 1, 2026 (Sprint Day 1)'}</span>
              </div>
            </div>

            {/* Streak & Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Streak Card */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col">
                <span className="text-[10px] text-amber-300 font-bold mb-0.5 flex items-center gap-1">
                  <span>🔥</span> Current Streak
                </span>
                <span className="text-lg font-black text-amber-400">{userStats.streak} Days</span>
                <span className="text-[9px] text-amber-200/70 mt-0.5">Best: {userStats.longestStreak} days</span>
              </div>

              {/* XP & Rank Card */}
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex flex-col">
                <span className="text-[10px] text-purple-300 font-bold mb-0.5 flex items-center gap-1">
                  <span>⭐</span> Points & Rank
                </span>
                <span className="text-lg font-black text-purple-400">{userStats.xp} XP</span>
                <span className="text-[9px] text-purple-200/70 mt-0.5">Rank #{userStats.rank} in India</span>
              </div>
            </div>

            {/* Progress & Freezes */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Sprint Completion</span>
                <span className="text-xs font-bold text-indigo-300">{userStats.completedDays} / 60 Projects Shipped</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold block">Streak Freezes</span>
                <span className="text-xs font-bold text-teal-400">{userStats.streakFreezes} Shield Token</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
