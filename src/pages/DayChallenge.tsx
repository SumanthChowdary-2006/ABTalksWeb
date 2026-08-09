import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ThemeToggle from '../components/ThemeToggle'
import LinkedInPreviewCard from '../components/LinkedInPreviewCard'
import CelebrationModal from '../components/CelebrationModal'
import FocusTimerWidget from '../components/FocusTimerWidget'
import { loadChallenges, saveChallenges, loadUserStats, saveUserStats } from '../utils/storage'

export default function DayChallenge() {
  const { dayId } = useParams()
  const navigate = useNavigate()
  const dayNumber = parseInt(dayId || '12', 10)

  const [challenges, setChallenges] = useState(() => loadChallenges())
  const [userStats, setUserStats] = useState(() => loadUserStats())

  const challenge = challenges.find(c => c.day === dayNumber) || {
    day: dayNumber,
    title: `Day ${dayNumber} Coding Challenge`,
    category: 'React & Fullstack',
    difficulty: 'Medium' as const,
    description: 'Build a production-ready feature with React, TypeScript, and clean API structure. Post your proof of work to LinkedIn and GitHub to claim your XP.',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    status: 'active' as const,
    githubUrl: '',
    linkedinUrl: ''
  }

  const [githubUrl, setGithubUrl] = useState(challenge.githubUrl || '')
  const [linkedinUrl, setLinkedinUrl] = useState(challenge.linkedinUrl || '')
  const [demoUrl, setDemoUrl] = useState(challenge.demoUrl || '')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(challenge.status === 'completed')
  const [errorMessage, setErrorMessage] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!githubUrl.trim()) {
      setErrorMessage('GitHub Repository or PR URL is required.')
      return
    }
    if (!linkedinUrl.trim()) {
      setErrorMessage('LinkedIn post proof link is required.')
      return
    }

    // Update challenge in list & LocalStorage
    const updatedChallenges = challenges.map(c => {
      if (c.day === dayNumber) {
        return {
          ...c,
          status: 'completed' as const,
          completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          githubUrl,
          linkedinUrl,
          demoUrl
        }
      }
      if (c.day === dayNumber + 1 && c.status === 'locked') {
        return { ...c, status: 'active' as const }
      }
      return c
    })

    const updatedStats = {
      ...userStats,
      completedDays: userStats.completedDays + (challenge.status !== 'completed' ? 1 : 0),
      streak: challenge.status === 'active' ? userStats.streak + 1 : userStats.streak,
      xp: userStats.xp + 100
    }

    setChallenges(updatedChallenges)
    setUserStats(updatedStats)
    saveChallenges(updatedChallenges)
    saveUserStats(updatedStats)

    setSubmitted(true)
    setErrorMessage('')
    setIsCelebrationOpen(true)
  }

  return (
    <div className="min-h-screen pb-60 sm:pb-48 text-slate-100" style={{ background: 'var(--bg)' }}>
      {/* Mesh background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[400px] h-[400px] -top-32 -left-32 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)' }}
        />
        <div
          className="absolute w-[350px] h-[350px] top-[40%] -right-24 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">

        {/* Back Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Sprint Day #{challenge.day}
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Focus Timer Widget */}
        <div className="mb-6">
          <FocusTimerWidget />
        </div>

        {/* Toast alert */}
        {toastMsg && (
          <div className="mb-4 p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center justify-between animate-bounce">
            <span>{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="text-blue-400 hover:text-white font-bold ml-2">✕</button>
          </div>
        )}

        {/* Challenge Header Card */}
        <section className="rounded-2xl p-6 glass border border-white/10 mb-6 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300">
              {challenge.category}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-400 border border-white/5">
              {challenge.difficulty}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">
            {challenge.title}
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {challenge.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {challenge.tags.map(t => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-400 border border-white/5">
                #{t}
              </span>
            ))}
          </div>
        </section>

        {/* Requirements & Criteria Card */}
        <section className="rounded-2xl p-5 glass border border-white/10 mb-6">
          <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider mb-3">
            📋 Acceptance Criteria
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Implement clean, responsive UI with accessible keyboard focus.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Ensure zero console warnings or uncaught runtime exceptions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Push code to a public GitHub repo with a descriptive README.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Post a video demo / screenshot on LinkedIn tagging <strong>#ABTalks #60DaysOfCode</strong>.</span>
            </li>
          </ul>
        </section>

        {/* Submission Form Card */}
        <section className="rounded-2xl p-6 glass border border-white/10 mb-8">
          <h3 className="text-sm font-black text-white mb-4 flex items-center justify-between">
            <span>🚀 Submit Proof of Work</span>
            {submitted && <span className="text-xs font-bold text-emerald-400">✓ Completed</span>}
          </h3>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center space-y-2">
              <p className="text-sm font-black">🎉 Day #{challenge.day} Completed!</p>
              <p className="text-emerald-200/80">You've earned <strong>+100 XP</strong> and maintained your streak.</p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white"
                >
                  Edit Submission
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  ⚠️ {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  GitHub Repository / PR Link <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project-day"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  LinkedIn Post Proof Link <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/posts/username_abtalks"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://my-demo.vercel.app"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Key Learnings & Notes
                </label>
                <textarea
                  placeholder="Share a short note on what you learned today..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              {/* Live LinkedIn Post Preview */}
              <div className="mt-4 pt-2">
                <LinkedInPreviewCard
                  studentName={userStats.name}
                  college={userStats.college}
                  dayNumber={challenge.day}
                  projectTitle={challenge.title}
                  githubUrl={githubUrl}
                  learnings={notes}
                  onCopySuccess={() => {
                    setToastMsg('📋 LinkedIn Post Copy Text Copied!')
                    setTimeout(() => setToastMsg(''), 3000)
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-black text-white grad-btn shadow-lg mt-3"
              >
                Submit Proof & Claim +100 XP 🎊
              </button>
            </form>
          )}
        </section>

      </div>

      {/* Completion Celebration Modal 🎉 */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        dayNumber={dayNumber}
        onClose={() => setIsCelebrationOpen(false)}
      />

      <BottomNav />
    </div>
  )
}
