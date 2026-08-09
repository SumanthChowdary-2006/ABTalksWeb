import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ThemeToggle from '../components/ThemeToggle'
import LinkedInPreviewCard from '../components/LinkedInPreviewCard'
import AchievementsModal from '../components/AchievementsModal'
import ReminderWidget from '../components/ReminderWidget'
import StreakRecoveryModal from '../components/StreakRecoveryModal'
import UserProfileModal from '../components/UserProfileModal'
import CelebrationModal from '../components/CelebrationModal'
import FocusTimerWidget from '../components/FocusTimerWidget'
import DailyMotivationWidget from '../components/DailyMotivationWidget'
import DeveloperDnaModal from '../components/DeveloperDnaModal'
import WeeklyChartWidget from '../components/WeeklyChartWidget'
import GoalSettingWidget from '../components/GoalSettingWidget'
import AuthModal from '../components/AuthModal'
import { fireConfetti } from '../utils/confetti'
import { sampleChallenges, initialUserStats, ChallengeDay } from '../data/challengesData'
import { loadChallenges, saveChallenges, loadUserStats, saveUserStats, resetStorage } from '../utils/storage'

export default function Dashboard() {
  const navigate = useNavigate()

  // State mode for Judge Edge Case evaluation: 'active' | 'new' | 'missed'
  const [demoState, setDemoState] = useState<'active' | 'new' | 'missed'>('active')

  // Initialize from LocalStorage
  const [challenges, setChallenges] = useState<ChallengeDay[]>(() => loadChallenges())
  const [userStats, setUserStats] = useState(() => loadUserStats())

  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'active' | 'missed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeDay | null>(null)
  
  // Auth Modal State & Scroll Progress
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [scrollProgress, setScrollProgress] = useState(0)

  // 3-Dot Menu & Collapsible Curriculum states
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCurriculumExpanded, setIsCurriculumExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Modals state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false)
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDnaOpen, setIsDnaOpen] = useState(false)
  
  // Celebration modal state 🎉
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)
  const [celebrationDay, setCelebrationDay] = useState(12)

  // Submission Form State
  const [githubInput, setGithubInput] = useState('')
  const [linkedinInput, setLinkedinInput] = useState('')
  const [demoInput, setDemoInput] = useState('')
  const [notesInput, setNotesInput] = useState('')
  const [formError, setFormError] = useState('')
  const [showToast, setShowToast] = useState('')

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    saveChallenges(challenges)
  }, [challenges])

  useEffect(() => {
    saveUserStats(userStats)
  }, [userStats])

  // Handle Judge Edge Case State Switching
  const switchDemoState = (mode: 'active' | 'new' | 'missed') => {
    setDemoState(mode)
    if (mode === 'new') {
      const newStats = {
        name: "Sumanth",
        username: "sumanth_dev",
        college: "Parul University",
        studyGroup: "AI & Machine Learning (AIML)",
        dateJoined: "Aug 1, 2026",
        streak: 0,
        longestStreak: 0,
        completedDays: 0,
        totalDays: 60,
        missedDays: 0,
        xp: 0,
        rank: 2400,
        totalStudents: 2400,
        streakFreezes: 1,
        githubConnected: true,
        linkedinConnected: true
      }
      const resetChallenges = sampleChallenges.map(c => ({
        ...c,
        status: (c.day === 1 ? 'active' : 'locked') as 'completed' | 'active' | 'missed' | 'locked',
        githubUrl: undefined,
        linkedinUrl: undefined
      }))
      setUserStats(newStats)
      setChallenges(resetChallenges)
      saveUserStats(newStats)
      saveChallenges(resetChallenges)
      setShowToast('🆕 Loaded New Student Profile (0 Streak)')
    } else if (mode === 'missed') {
      const missedStats = {
        ...initialUserStats,
        streak: 12,
        missedDays: 1
      }
      const missedChallenges = sampleChallenges.map(c => {
        if (c.day === 12) return { ...c, status: 'missed' as const }
        if (c.day === 13) return { ...c, status: 'active' as const }
        return c
      })
      setUserStats(missedStats)
      setChallenges(missedChallenges)
      saveUserStats(missedStats)
      saveChallenges(missedChallenges)
      setShowToast('⚠️ Loaded Missed Day Edge Case (Day 12 Missed)')
    } else {
      setUserStats(initialUserStats)
      setChallenges(sampleChallenges)
      saveUserStats(initialUserStats)
      saveChallenges(sampleChallenges)
      setShowToast('🔥 Loaded Active Student Profile (12-Day Streak)')
    }
    setTimeout(() => setShowToast(''), 3500)
  }

  const handleResetData = () => {
    resetStorage()
    setUserStats(initialUserStats)
    setChallenges(sampleChallenges)
    setShowToast('🔄 Data Reset to Defaults!')
    setTimeout(() => setShowToast(''), 3500)
  }

  // Calculate live progress metrics
  const completedCount = challenges.filter(c => c.status === 'completed').length
  const progressPercent = Math.round((completedCount / userStats.totalDays) * 100)
  const activeDay = challenges.find(c => c.status === 'active') || challenges[11]

  // Filtered challenges
  const filteredChallenges = challenges.filter(item => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'completed'
        ? item.status === 'completed'
        : activeFilter === 'active'
        ? item.status === 'active'
        : item.status === 'missed'

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      `day ${item.day}`.includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const openChallengeModal = (challenge: ChallengeDay) => {
    setSelectedChallenge(challenge)
    setGithubInput(challenge.githubUrl || '')
    setLinkedinInput(challenge.linkedinUrl || '')
    setDemoInput(challenge.demoUrl || '')
    setNotesInput('')
    setFormError('')
    setIsSubmitModalOpen(true)
  }

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!githubInput.trim()) {
      setFormError('Please enter a valid GitHub repository or PR URL.')
      return
    }
    if (!linkedinInput.trim()) {
      setFormError('Please enter your LinkedIn post proof URL.')
      return
    }

    if (!selectedChallenge) return

    const dayNum = selectedChallenge.day

    const updated = challenges.map(c => {
      if (c.day === selectedChallenge.day) {
        return {
          ...c,
          status: 'completed' as const,
          completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          githubUrl: githubInput,
          linkedinUrl: linkedinInput,
          demoUrl: demoInput
        }
      }
      if (c.day === selectedChallenge.day + 1 && c.status === 'locked') {
        return { ...c, status: 'active' as const }
      }
      return c
    })

    const updatedStats = {
      ...userStats,
      completedDays: userStats.completedDays + (selectedChallenge.status !== 'completed' ? 1 : 0),
      streak: selectedChallenge.status === 'active' ? userStats.streak + 1 : userStats.streak,
      xp: userStats.xp + 100
    }

    setChallenges(updated)
    setUserStats(updatedStats)
    saveChallenges(updated)
    saveUserStats(updatedStats)

    setIsSubmitModalOpen(false)
    setCelebrationDay(dayNum)
    setIsCelebrationOpen(true)
  }

  const handleRecoverSuccess = (method: 'freeze' | 'quiz') => {
    const updated = challenges.map(c => {
      if (c.status === 'missed') {
        return {
          ...c,
          status: 'completed' as const,
          completedAt: method === 'freeze' ? 'Recovered via Freeze 🛡️' : 'Recovered via Catchup Quiz ⚡',
          githubUrl: 'https://github.com/sumanth_dev/recovered-day-12',
          linkedinUrl: 'https://linkedin.com/posts/recovered-day-12'
        }
      }
      return c
    })

    const updatedStats = {
      ...userStats,
      streakFreezes: method === 'freeze' ? Math.max(0, userStats.streakFreezes - 1) : userStats.streakFreezes,
      missedDays: 0,
      completedDays: userStats.completedDays + 1,
      xp: userStats.xp + 50
    }

    setChallenges(updated)
    setUserStats(updatedStats)
    saveChallenges(updated)
    saveUserStats(updatedStats)

    setCelebrationDay(12)
    setIsCelebrationOpen(true)
  }

  return (
    <div className="min-h-screen pb-28 text-neutral-100 font-sans" style={{ background: '#0B0F19' }}>
      {/* Top Dynamic Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-900/50">
        <div
          className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Responsive Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">

        {/* Top Header: Logo + Profile + 3-Dot Menu */}
        <header className="flex items-center justify-between py-3 mb-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-black text-sm text-white shadow-lg shadow-[#3b82f6]/30">
              AB
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">ABTalks Web</h1>
              <p className="text-xs font-medium text-[#8b5cf6]">60-Day Coding Sprint</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Student Profile Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-neutral-900 border border-white/10 hover:border-[#3b82f6]/40 active:scale-95 transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-xs font-bold text-white shadow-md">
                {userStats.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">{userStats.name}</span>
            </button>

            {/* 3-Dot Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              title="Open Tools & Menu"
              className="w-10 h-10 rounded-2xl bg-neutral-900 border border-white/15 text-white hover:bg-neutral-800 flex items-center justify-center font-bold text-lg active:scale-95 transition-all shadow-md"
            >
              ⋮
            </button>
          </div>
        </header>

        {/* Toast Alert Banner */}
        {showToast && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#3b82f6] text-xs font-semibold flex items-center justify-between animate-fadeIn shadow-sm">
            <span className="truncate">{showToast}</span>
            <button onClick={() => setShowToast('')} className="text-white font-bold ml-2 flex-shrink-0">✕</button>
          </div>
        )}

        {/* Distraction-Free Layout: Equal-Height Responsive Grid Cards */}
        <main className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">

            {/* CARD 1: Streak (Big Highlight) */}
            <div className="linear-card p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flame text-xl">🔥</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Daily Streak</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6]">
                    🛡️ {userStats.streakFreezes} Freeze
                  </span>
                </div>

                <div className="my-2">
                  <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                    <span>{userStats.streak}</span>
                    <span className="text-sm font-medium text-neutral-400">Days Active</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {userStats.missedDays > 0 ? '⚠️ Day 12 is missed! Recover now to keep your streak intact.' : 'Ship code daily before 11:59 PM to maintain your streak.'}
                  </p>
                </div>
              </div>

              {userStats.missedDays > 0 ? (
                <button
                  onClick={() => setIsRecoveryModalOpen(true)}
                  className="w-full py-2.5 mt-3 rounded-xl text-xs font-bold bg-amber-500 text-black active:scale-95 transition-all shadow-md text-center"
                >
                  🛡️ Recover Missed Day
                </button>
              ) : (
                <div className="mt-3 text-[11px] text-[#30d158] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse" />
                  Streak is active today
                </div>
              )}
            </div>

            {/* CARD 2: Progress (No Text Overlap) */}
            <div className="linear-card p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sprint Progress</span>
                  <span className="text-xs font-extrabold text-[#3b82f6] bg-[#3b82f6]/15 px-2.5 py-0.5 rounded-full border border-[#3b82f6]/30">
                    ⭐ {userStats.xp} XP
                  </span>
                </div>

                <div className="my-2">
                  <div className="text-4xl font-extrabold text-white">{progressPercent}%</div>
                  <p className="text-xs font-medium text-neutral-400 mt-1">
                    {completedCount} of {userStats.totalDays} Days Completed
                  </p>
                </div>
              </div>

              <div className="mt-3">
                {/* Clean Gradient Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-neutral-950 border border-white/10 p-0.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] transition-all duration-500 ease-out shadow-[0_0_10px_#3b82f6]"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CARD 3: Today's Task */}
            <div className="linear-card p-5 border-[#3b82f6]/40 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Today's Task</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    activeDay.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/40 animate-pulse'
                  }`}>
                    {activeDay.status === 'completed' ? '✓ Completed' : '⚡ Active Now'}
                  </span>
                </div>

                <h2 className="text-base font-extrabold text-white mb-1.5 leading-snug">
                  Day {activeDay.day}: {activeDay.title}
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {activeDay.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => openChallengeModal(activeDay)}
                  className="grad-btn flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white shadow-lg active:scale-95 text-center"
                >
                  {activeDay.status === 'completed' ? 'Update Submission 🚀' : 'Ship Solution Today 🔥'}
                </button>
                <button
                  onClick={() => navigate(`/day/${activeDay.day}`)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-neutral-300 active:scale-95 text-center flex-shrink-0"
                >
                  View Spec →
                </button>
              </div>
            </div>

            {/* CARD 4: Rank (Vertical Balanced Layout) */}
            <div className="linear-card p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Rank Badge</span>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-black text-xs text-white shadow-md">
                    #{userStats.rank}
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-3xl font-extrabold text-white">Rank #{userStats.rank}</div>
                  <p className="text-xs text-neutral-400 mt-1">Top 2% of {userStats.totalStudents} Student Builders</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/leaderboard')}
                className="w-full py-2.5 mt-3 rounded-xl text-xs font-bold text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/30 hover:bg-[#3b82f6]/20 active:scale-95 transition-all text-center"
              >
                View Leaderboard →
              </button>
            </div>
          </div>

          {/* Collapsible 60-Day Curriculum Section */}
          <div className="pt-2">
            <button
              onClick={() => setIsCurriculumExpanded(!isCurriculumExpanded)}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-between text-xs font-bold text-neutral-300 hover:text-white transition-all"
            >
              <span>📚 60-Day Sprint Curriculum ({filteredChallenges.length})</span>
              <span>{isCurriculumExpanded ? '▲ Hide' : '▼ Expand'}</span>
            </button>

            {isCurriculumExpanded && (
              <div className="mt-3 space-y-3 animate-fadeIn">
                {/* Search & Filter Bar */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Search challenges by title or tag..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-white/10">
                    {(['all', 'completed', 'active', 'missed'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all ${
                          activeFilter === f ? 'bg-[#3b82f6] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Cards Grid */}
                <div className="space-y-2">
                  {filteredChallenges.slice(0, 15).map(challenge => (
                    <div
                      key={challenge.day}
                      onClick={() => openChallengeModal(challenge)}
                      className="linear-card p-3 cursor-pointer hover:border-[#3b82f6]/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-white">Day {challenge.day}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            challenge.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                            challenge.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                            challenge.status === 'missed' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-neutral-800 text-neutral-500'
                          }`}>
                            {challenge.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-neutral-300 line-clamp-1">{challenge.title}</h4>
                      </div>
                      <span className="text-xs text-neutral-400">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 3-DOT OVERFLOW MENU SHEET ⚙️ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn text-neutral-100">
          <div className="w-full max-w-md bg-[#0B0F19] border border-white/15 rounded-t-[32px] sm:rounded-[32px] p-6 pb-24 sm:pb-6 shadow-2xl overflow-y-auto max-h-[90vh] animate-sheet">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>⚙️</span> Extra Tools & Features
              </h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="space-y-4">
              {/* Judge / Demo Mode Controls */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                <p className="text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wider">Demo Controls</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => { switchDemoState('active'); setIsMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${demoState === 'active' ? 'bg-[#3b82f6] text-white' : 'bg-neutral-800 text-neutral-400'}`}
                  >
                    🔥 Active State
                  </button>
                  <button
                    onClick={() => { switchDemoState('new'); setIsMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${demoState === 'new' ? 'bg-[#3b82f6] text-white' : 'bg-neutral-800 text-neutral-400'}`}
                  >
                    🆕 0 Streak
                  </button>
                  <button
                    onClick={() => { switchDemoState('missed'); setIsMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${demoState === 'missed' ? 'bg-amber-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}
                  >
                    ⚠️ Missed Day
                  </button>
                  <button
                    onClick={() => { handleResetData(); setIsMenuOpen(false); }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-800 text-rose-400"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* Extra Features */}
              <FocusTimerWidget />
              <ReminderWidget />
              <DailyMotivationWidget />
              <WeeklyChartWidget />
              <GoalSettingWidget completedDays={userStats.completedDays} />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setIsDnaOpen(true); setIsMenuOpen(false); }}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  <span>🧬</span> DNA Profile
                </button>
                <button
                  onClick={() => { setIsAchievementsOpen(true); setIsMenuOpen(false); }}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  <span>🏆</span> Badges
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {isSubmitModalOpen && selectedChallenge && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-md bg-[#0B0F19] border border-white/15 rounded-t-[32px] sm:rounded-[32px] p-6 pb-24 sm:pb-6 shadow-2xl overflow-y-auto max-h-[92vh] animate-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Day {selectedChallenge.day}: Submit Solution</h3>
                <p className="text-xs text-neutral-400">{selectedChallenge.title}</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-3 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmission} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">GitHub Repo or PR URL *</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={githubInput}
                  onChange={e => setGithubInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">LinkedIn Post Proof URL *</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/posts/..."
                  value={linkedinInput}
                  onChange={e => setLinkedinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Live Demo / Preview URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://my-demo-app.vercel.app"
                  value={demoInput}
                  onChange={e => setDemoInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="grad-btn w-full py-3 rounded-full text-xs font-bold text-white shadow-lg active:scale-95"
                >
                  Submit & Complete Day {selectedChallenge.day} 🔥
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Streak Recovery Modal */}
      <StreakRecoveryModal
        isOpen={isRecoveryModalOpen}
        missedDayNumber={12}
        availableFreezes={userStats.streakFreezes}
        onClose={() => setIsRecoveryModalOpen(false)}
        onRecoverSuccess={handleRecoverSuccess}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      {/* Profile Details Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        userStats={userStats}
        onClose={() => setIsProfileOpen(false)}
        onUpdateUserStats={(updated) => {
          setUserStats(updated)
          saveUserStats(updated)
        }}
      />

      {/* Developer DNA Profile Modal */}
      <DeveloperDnaModal
        isOpen={isDnaOpen}
        onClose={() => setIsDnaOpen(false)}
      />

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        dayNumber={celebrationDay}
        onClose={() => setIsCelebrationOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setUserStats(prev => ({ ...prev, name: user.name, college: user.college, username: user.username }))
          setShowToast(`✓ Welcome ${user.name}! Profile updated.`)
          setTimeout(() => setShowToast(''), 3500)
        }}
      />

      {/* Persistent Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
