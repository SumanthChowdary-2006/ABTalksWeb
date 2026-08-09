import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/', icon: HomeIcon, label: 'Home' },
  { path: '/dashboard', icon: DashIcon, label: 'Dashboard' },
  { path: '/leaderboard', icon: TrophyIcon, label: 'Ranks' },
  { path: '/day/12', icon: CodeIcon, label: 'Today' },
]

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" fill="none" />
    </svg>
  )
}

function DashIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="2" fill={active ? 'currentColor' : 'none'} />
      <rect x="14" y="3" width="7" height="7" rx="2" fill={active ? 'currentColor' : 'none'} />
      <rect x="3" y="14" width="7" height="7" rx="2" fill={active ? 'currentColor' : 'none'} />
      <rect x="14" y="14" width="7" height="7" rx="2" fill={active ? 'currentColor' : 'none'} />
    </svg>
  )
}

function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M17 3H7l1 8a4 4 0 008 0l1-8z" fill={active ? 'rgba(10,132,255,0.2)' : 'none'} />
      <path d="M17 3c0 0 3 0 3 4s-3 4-3 4M7 3c0 0-3 0-3 4s3 4 3 4" />
    </svg>
  )
}

function CodeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav
        className="max-w-md mx-auto w-full pointer-events-auto rounded-full p-1.5 border border-white/15 dark:border-white/15 shadow-2xl shadow-black/80"
        style={{
          background: 'rgba(28, 28, 30, 0.78)',
          backdropFilter: 'blur(36px) saturate(190%)',
          WebkitBackdropFilter: 'blur(36px) saturate(190%)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-1">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path || (path === '/day/12' && location.pathname.startsWith('/day/'))
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-full transition-all duration-200 active:scale-90 ${
                  active ? 'text-[#0a84ff] font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
                style={{ minWidth: 64 }}
              >
                <Icon active={active} />
                <span className="text-[10px] tracking-tight font-medium">
                  {label}
                </span>
                {active && (
                  <span
                    className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#0a84ff] shadow-[0_0_8px_#0a84ff]"
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
