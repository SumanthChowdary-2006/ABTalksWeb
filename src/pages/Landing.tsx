import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ThemeToggle from '../components/ThemeToggle'
import AuthModal from '../components/AuthModal'

const topBuilders = [
  { name: 'Priya S.', streak: 48, college: 'IIT Delhi' },
  { name: 'Rahul M.', streak: 45, college: 'NIT Trichy' },
  { name: 'Ananya K.', streak: 43, college: 'BITS Pilani' },
]

const steps = [
  {
    step: '01',
    title: 'Daily Challenge',
    desc: 'Unlocks at 8:00 AM daily. Clean spec + acceptance criteria.',
    icon: '⚡',
  },
  {
    step: '02',
    title: 'Ship to GitHub',
    desc: 'Write code, push repository or PR before 11:59 PM.',
    icon: '🐙',
  },
  {
    step: '03',
    title: 'Post on LinkedIn',
    desc: 'Share proof link to build your public recruiter portfolio.',
    icon: '🚀',
  },
]

const marqueeItems = [
  '🔥 Priya just shipped Day 48!',
  '⚡ Rahul completed React Challenge',
  '🚀 2,400+ students active',
  '🎯 94% offer rate',
  '💡 New prompt dropped for Day 12',
  '🏆 Leaderboard updated',
]

export default function Landing() {
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  // Dynamic Scroll Progress & Sticky Navbar logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }

  return (
    <div className="min-h-screen pb-28 relative text-neutral-100 overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      {/* Top Dynamic Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-900/50">
        <div
          className="h-full bg-gradient-to-r from-[#0a84ff] via-[#5e5ce6] to-[#bf5af2] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-25 rounded-full blur-3xl transition-transform duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(10,132,255,0.4) 0%, transparent 70%)',
            transform: `translate(-50%, ${scrollProgress * 0.5}px)`
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] top-[45%] -right-40 opacity-20 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(191,90,242,0.35) 0%, transparent 70%)' }}
        />
      </div>

      {/* Dynamic Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-950/80 backdrop-blur-2xl border-b border-white/10 py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center font-black text-sm text-white shadow-lg group-hover:scale-105 transition-transform">
              AB
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">ABTalks Web</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Auth Buttons */}
            <button
              onClick={() => openAuth('login')}
              className="text-xs font-semibold px-3.5 py-2 rounded-full border border-white/15 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 active:scale-95 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => openAuth('register')}
              className="text-xs font-bold px-4 py-2 rounded-full bg-[#0a84ff] hover:bg-[#007aff] text-white shadow-lg shadow-[#0a84ff]/30 active:scale-95 transition-all"
            >
              Register Free
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 rounded-full bg-neutral-900/40 border border-white/10 hover:bg-neutral-800 text-neutral-300"
            >
              🏆 Ranks
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-col px-4 sm:px-6 lg:px-8 pt-6 max-w-5xl mx-auto w-full">

        {/* Live Active Student Badge */}
        <div className="flex justify-center mb-6 animate-fadeIn">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0a84ff]/10 border border-[#0a84ff]/25 text-[#0a84ff] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#30d158] inline-block shadow-[0_0_8px_#30d158]" />
            2,400+ active student builders across 120+ Indian Colleges
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-extrabold leading-[1.1] tracking-tight mb-5 text-4xl sm:text-5xl lg:text-6xl text-white">
            Build Daily.{' '}
            <span className="grad-text">Get Hired</span>{' '}
            Faster.
          </h1>
          <p className="text-sm sm:text-lg leading-relaxed text-neutral-400 max-w-xl mx-auto font-normal">
            60-day coding sprint for Indian college students.
            One commit. One post. Every single day.
          </p>
        </div>

        {/* iOS Stats Card */}
        <div className="ios-card rounded-[28px] p-6 mb-8 max-w-2xl mx-auto w-full grid grid-cols-3 gap-4">
          {[
            { val: '2,400+', label: 'Active Students', color: '#0a84ff' },
            { val: '60 Days', label: 'Coding Sprint', color: '#5e5ce6' },
            { val: '94%', label: 'Offer Rate', color: '#bf5af2' },
          ].map(({ val, label, color }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold mb-0.5 tracking-tight" style={{ color }}>{val}</div>
              <div className="text-[11px] sm:text-xs font-medium text-neutral-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Hero CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full mb-10">
          <button
            onClick={() => openAuth('register')}
            className="grad-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white text-sm shadow-xl active:scale-95"
          >
            <span>Start My 60-Day Streak 🔥</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold transition-all bg-neutral-900/60 border border-white/15 hover:bg-neutral-800 text-neutral-200 active:scale-95"
          >
            View Dashboard →
          </button>
        </div>

        {/* Live Marquee */}
        <div className="mb-12 overflow-hidden max-w-3xl mx-auto w-full">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3 text-neutral-400 text-center">Live Student Activity</p>
          <div className="overflow-hidden rounded-2xl" style={{ mask: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-3 marquee-inner whitespace-nowrap">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900/70 border border-white/10 text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">How It Works</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.step} className="ios-card rounded-[24px] p-5 flex flex-col justify-between hover:border-[#0a84ff]/40 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0a84ff]">{s.step}</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#0a84ff]/10 border border-[#0a84ff]/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1.5 tracking-tight">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Builders Leaderboard Preview */}
        <div className="mb-10 max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white tracking-tight">Top Builders This Week</p>
            <button
              onClick={() => navigate('/leaderboard')}
              className="text-xs font-semibold text-[#0a84ff] hover:underline"
            >
              See Leaderboard →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topBuilders.map((b, i) => (
              <div key={b.name} className="ios-card rounded-[20px] px-4 py-3.5 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 shadow-md"
                  style={
                    i === 0 ? { background: 'linear-gradient(135deg,#ffd60a,#ff9f0a)', color: '#000' }
                      : i === 1 ? { background: 'linear-gradient(135deg,#e5e5ea,#8e8e93)', color: '#000' }
                      : { background: 'linear-gradient(135deg,#ff9f0a,#ac4e00)', color: '#fff' }
                  }
                >
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{b.name}</p>
                  <p className="text-[10px] text-neutral-400 truncate">{b.college}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-[#ff9f0a]">🔥 {b.streak}</p>
                  <p className="text-[9px] text-neutral-400">streak</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-10 rounded-[28px] p-6 ios-card text-center relative overflow-hidden max-w-3xl mx-auto w-full">
          <p className="text-xs font-bold tracking-widest uppercase mb-5 text-[#0a84ff]">
            Follow ABTalks on AI
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://www.linkedin.com/company/abtalks-on-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#0a84ff]/20 border border-[#0a84ff]/30 flex items-center justify-center text-[#0a84ff] font-bold text-xs flex-shrink-0">
                  in
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-[#0a84ff] transition-colors">LinkedIn</p>
                  <p className="text-[10px] text-neutral-400 truncate">ABTalks on AI</p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white flex-shrink-0">↗</span>
            </a>

            <a
              href="https://youtube.com/@abtalksonai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#ff453a]/20 border border-[#ff453a]/30 flex items-center justify-center text-[#ff453a] font-bold text-xs flex-shrink-0">
                  ▶
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-[#ff453a] transition-colors">YouTube</p>
                  <p className="text-[10px] text-neutral-400 truncate">@abtalksonai</p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white flex-shrink-0">↗</span>
            </a>

            <a
              href="https://discord.gg/946Ucj6dd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#5e5ce6]/20 border border-[#5e5ce6]/30 flex items-center justify-center text-[#5e5ce6] font-bold text-xs flex-shrink-0">
                  👾
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-[#5e5ce6] transition-colors">Discord</p>
                  <p className="text-[10px] text-neutral-400 truncate">Community</p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white flex-shrink-0">↗</span>
            </a>
          </div>
        </div>

        <p className="text-center text-xs pb-4 text-neutral-400">
          Free for Indian college students · Frontend Ready for Deployment
        </p>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => navigate('/dashboard')}
      />

      <BottomNav />
    </div>
  )
}
