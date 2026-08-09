import { useState } from 'react'

export interface BadgeItem {
  id: string
  icon: string
  title: string
  category: string
  description: string
  unlocked: boolean
  progress: number
  total: number
  rewardXp: number
}

export const sampleBadges: BadgeItem[] = [
  {
    id: 'first_commit',
    icon: '🥇',
    title: 'First Commit',
    category: 'Starter',
    description: 'Submit your first daily project proof of work.',
    unlocked: true,
    progress: 1,
    total: 1,
    rewardXp: 100
  },
  {
    id: 'streak_7',
    icon: '🔥',
    title: '7-Day Flame',
    category: 'Consistency',
    description: 'Maintain an unbroken 7-day coding streak.',
    unlocked: true,
    progress: 7,
    total: 7,
    rewardXp: 250
  },
  {
    id: 'quick_shipper',
    icon: '⚡',
    title: 'Quick Shipper',
    category: 'Speed',
    description: 'Submit 5 project proofs before 10 PM.',
    unlocked: true,
    progress: 5,
    total: 5,
    rewardXp: 150
  },
  {
    id: 'sprint_12',
    icon: '🚀',
    title: '2-Week Pioneer',
    category: 'Milestone',
    description: 'Successfully complete 12 full sprint days.',
    unlocked: true,
    progress: 12,
    total: 12,
    rewardXp: 300
  },
  {
    id: 'streak_defender',
    icon: '🛡️',
    title: 'Streak Defender',
    category: 'Resilience',
    description: 'Protect your streak using a Streak Freeze.',
    unlocked: true,
    progress: 1,
    total: 1,
    rewardXp: 100
  },
  {
    id: 'top_50',
    icon: '🏆',
    title: 'Top 50 Builder',
    category: 'Leaderboard',
    description: 'Climb into the Top 50 of the student leaderboard.',
    unlocked: true,
    progress: 47,
    total: 50,
    rewardXp: 400
  },
  {
    id: 'fullstack_master',
    icon: '💻',
    title: 'Fullstack Pioneer',
    category: 'Curriculum',
    description: 'Complete 30 fullstack coding challenges.',
    unlocked: false,
    progress: 12,
    total: 30,
    rewardXp: 500
  },
  {
    id: 'grand_graduate',
    icon: '🎓',
    title: '60-Day Graduate',
    category: 'Mastery',
    description: 'Complete all 60 days of the ABTalks Coding Sprint.',
    unlocked: false,
    progress: 12,
    total: 60,
    rewardXp: 1000
  }
]

interface AchievementsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  if (!isOpen) return null

  const unlockedCount = sampleBadges.filter(b => b.unlocked).length
  const filteredBadges = sampleBadges.filter(b => {
    if (filter === 'unlocked') return b.unlocked
    if (filter === 'locked') return !b.unlocked
    return true
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl p-5 pb-20 sm:pb-6 shadow-2xl overflow-y-auto max-h-[90vh] overscroll-contain text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              🏆
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Achievement Badges</h3>
              <p className="text-[10px] text-slate-400">{unlockedCount} of {sampleBadges.length} Badges Unlocked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 my-3">
          {(['all', 'unlocked', 'locked'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                filter === tab
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? `All (${sampleBadges.length})` : tab === 'unlocked' ? `Unlocked (${unlockedCount})` : `Locked (${sampleBadges.length - unlockedCount})`}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
          {filteredBadges.map(badge => {
            const percent = Math.min(100, Math.round((badge.progress / badge.total) * 100))

            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                  badge.unlocked
                    ? 'bg-purple-950/20 border-purple-500/30 shadow-md shadow-purple-950/20'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border ${
                  badge.unlocked
                    ? 'bg-purple-500/20 border-purple-400/40'
                    : 'bg-slate-800 border-slate-700 grayscale'
                }`}>
                  {badge.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{badge.title}</h4>
                    <span className="text-[9px] font-extrabold text-amber-400 flex-shrink-0">+{badge.rewardXp} XP</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug line-clamp-2 mb-1.5">{badge.description}</p>
                  
                  {/* Progress Meter */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        badge.unlocked ? 'bg-gradient-to-r from-purple-500 to-indigo-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1">
                    <span>{badge.unlocked ? 'Unlocked ✓' : 'In Progress'}</span>
                    <span>{badge.progress}/{badge.total}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
