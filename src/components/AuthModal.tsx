import { useState } from 'react'
import { fireConfetti } from '../utils/confetti'

interface AuthModalProps {
  isOpen: boolean
  initialMode?: 'login' | 'register'
  onClose: () => void
  onSuccess: (user: { name: string; username: string; college: string }) => void
}

export default function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [college, setCollege] = useState('Parul University')
  const [studyGroup, setStudyGroup] = useState('AI & Machine Learning (AIML)')
  const [toastMsg, setToastMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'register') {
      const displayName = name.trim() || 'Student Builder'
      const username = email.split('@')[0] || 'student_dev'
      const user = { name: displayName, username, college }
      
      localStorage.setItem('abtalks_user_session', JSON.stringify({ ...user, isLoggedIn: true }))
      fireConfetti()
      setToastMsg('🎉 Account Created! Welcome to ABTalks 60-Day Challenge')
      setTimeout(() => {
        onSuccess(user)
        onClose()
      }, 1200)
    } else {
      const displayName = email ? email.split('@')[0] : 'Sumanth'
      const user = { name: displayName, username: `${displayName.toLowerCase()}_dev`, college }
      localStorage.setItem('abtalks_user_session', JSON.stringify({ ...user, isLoggedIn: true }))
      setToastMsg('✓ Welcome back! Logged in successfully.')
      setTimeout(() => {
        onSuccess(user)
        onClose()
      }, 900)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xl animate-fadeIn text-neutral-100">
      <div className="w-full max-w-md bg-neutral-900/95 border border-white/15 rounded-t-[32px] sm:rounded-[32px] p-6 pb-24 sm:pb-6 shadow-2xl overflow-y-auto max-h-[92vh] animate-sheet">
        {/* iOS Drag Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#0a84ff]/20 text-[#0a84ff] flex items-center justify-center font-bold text-sm">
              🔑
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">
                {mode === 'login' ? 'Sign In to ABTalks' : 'Join 60-Day Sprint'}
              </h3>
              <p className="text-[11px] text-neutral-400">Build your developer portfolio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center font-bold text-xs active:scale-95 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="my-3 p-3 rounded-2xl bg-[#30d158]/15 border border-[#30d158]/30 text-[#30d158] text-xs font-semibold text-center animate-fadeIn">
            {toastMsg}
          </div>
        )}

        {/* Segmented Mode Switcher */}
        <div className="my-4 p-1 rounded-2xl bg-neutral-800/80 border border-white/10 flex items-center">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'login' ? 'bg-[#0a84ff] text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'register' ? 'bg-[#0a84ff] text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Sumanth Dev"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-950/80 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="sumanth@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-950/80 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-950/80 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
              required
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">College / University</label>
                <input
                  type="text"
                  placeholder="e.g. Parul University"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-950/80 border border-white/15 text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Study Track / Domain</label>
                <select
                  value={studyGroup}
                  onChange={e => setStudyGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-neutral-950/80 border border-white/15 text-white focus:outline-none"
                >
                  <option value="AI & Machine Learning (AIML)">AI & Machine Learning (AIML)</option>
                  <option value="Full-Stack Web Dev">Full-Stack Web Dev</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                </select>
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-bold bg-[#0a84ff] hover:bg-[#007aff] text-white shadow-lg shadow-[#0a84ff]/30 active:scale-95 transition-all"
            >
              {mode === 'login' ? 'Sign In to Dashboard 🚀' : 'Create Free Account 🎉'}
            </button>
          </div>

          <p className="text-[10px] text-center text-neutral-400 mt-2">
            Instant frontend authorization saved locally in browser storage.
          </p>
        </form>
      </div>
    </div>
  )
}
