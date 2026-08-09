import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ThemeToggle from '../components/ThemeToggle'

const MY_RANK = 47

const allUsers = [
  { rank: 1,  name: 'Priya Sharma',    college: 'IIT Delhi',    streak: 48, days: 58, badge: '🥇' },
  { rank: 2,  name: 'Rahul Mehta',     college: 'NIT Trichy',   streak: 45, days: 57, badge: '🥈' },
  { rank: 3,  name: 'Ananya Kapoor',   college: 'BITS Pilani',  streak: 43, days: 56, badge: '🥉' },
  { rank: 4,  name: 'Karan Verma',     college: 'VIT Vellore',  streak: 41, days: 55, badge: '' },
  { rank: 5,  name: 'Sneha Rao',       college: 'IIIT Hyd',     streak: 39, days: 53, badge: '' },
  { rank: 6,  name: 'Dev Patel',       college: 'Jadavpur',     streak: 37, days: 52, badge: '' },
  { rank: 7,  name: 'Ishaan Gupta',    college: 'DTU Delhi',    streak: 36, days: 51, badge: '' },
  { rank: 8,  name: 'Tanvi Joshi',     college: 'COEP Pune',    streak: 34, days: 50, badge: '' },
  { rank: 9,  name: 'Aditya Singh',    college: 'IIT Madras',   streak: 32, days: 49, badge: '' },
  { rank: 10, name: 'Riya Nair',       college: 'NIT Calicut',  streak: 31, days: 48, badge: '' },
  { rank: 11, name: 'Harsh Bansal',    college: 'IIT Roorkee',  streak: 29, days: 47, badge: '' },
  { rank: 12, name: 'Pooja Tiwari',    college: 'IIT KGP',      streak: 28, days: 46, badge: '' },
  { rank: 13, name: 'Neeraj Kumar',    college: 'NSIT Delhi',   streak: 27, days: 45, badge: '' },
  { rank: 14, name: 'Simran Kaur',     college: 'PEC Chandigarh', streak: 26, days: 45, badge: '' },
  { rank: 15, name: 'Vatsal Shah',     college: 'IIT Gandhinagar', streak: 25, days: 44, badge: '' },
  { rank: 44, name: 'Prithvi R.',      college: 'NIT Calicut',  streak: 13, days: 13, badge: '' },
  { rank: 45, name: 'Meera Jain',      college: 'IIT Bombay',   streak: 13, days: 13, badge: '' },
  { rank: 46, name: 'Sai Kumar',       college: 'BITS Goa',     streak: 12, days: 12, badge: '' },
  { rank: 47, name: 'Arjun Kapoor',    college: 'VIT Chennai',  streak: 12, days: 12, badge: '', isMe: true },
  { rank: 48, name: 'Rohan Tyagi',     college: 'SRM Chennai',  streak: 12, days: 12, badge: '' },
  { rank: 49, name: 'Divya Menon',     college: 'PSG Tech',     streak: 11, days: 12, badge: '' },
]

const tabs = ['All', 'My Region', 'Friends']

function Avatar({ name, isMe, rank }: { name: string; isMe?: boolean; rank: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const colors = [
    'linear-gradient(135deg,#3b82f6,#6366f1)',
    'linear-gradient(135deg,#8b5cf6,#ec4899)',
    'linear-gradient(135deg,#06b6d4,#3b82f6)',
    'linear-gradient(135deg,#10b981,#3b82f6)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
  ]
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
      style={{ background: isMe ? 'linear-gradient(135deg,#3b82f6,#7c3aed)' : colors[rank % colors.length] }}
    >
      {initials}
    </div>
  )
}

export default function Leaderboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const top3 = allUsers.slice(0, 3)
  const rest = allUsers.slice(3)

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] -top-40 left-1/2 -translate-x-1/2 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, transparent 65%)' }}
        />
        <div
          className="absolute w-[300px] h-[300px] bottom-10 -right-20 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between pt-12 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-black">Leaderboard 🏆</h1>
              <p className="text-xs" style={{ color: '#334155' }}>2,400 active students · Week 2</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* My rank banner */}
        <div
          className="rounded-2xl px-5 py-4 mb-6 flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(124,58,237,0.18))',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#7c3aed)' }}
          >
            AK
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Your Rank</p>
            <p className="text-xs" style={{ color: '#6366f1' }}>VIT Chennai · 🔥 12 day streak</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black grad-text">#{MY_RANK}</p>
            <p className="text-[10px]" style={{ color: '#475569' }}>Top 2%</p>
          </div>
        </div>

        {/* Podium */}
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-widest uppercase mb-5 text-center" style={{ color: '#334155' }}>
            Top 3 This Week
          </p>
          <div className="flex items-end justify-center gap-3">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <Avatar name={top3[1].name} rank={2} />
              <div className="text-center">
                <p className="text-xs font-bold truncate">{top3[1].name.split(' ')[0]}</p>
                <p className="text-[10px]" style={{ color: '#475569' }}>{top3[1].college}</p>
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center justify-end pb-3 pt-4"
                style={{
                  height: 80,
                  background: 'linear-gradient(180deg, rgba(148,163,184,0.12), rgba(100,116,139,0.08))',
                  border: '1px solid rgba(148,163,184,0.15)',
                  borderBottom: 'none',
                }}
              >
                <span className="text-2xl">🥈</span>
                <span className="font-black text-sm grad-text">🔥{top3[1].streak}</span>
              </div>
            </div>

            {/* 1st */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: 'rgba(251,191,36,0.2)' }}
              >
                👑
              </div>
              <Avatar name={top3[0].name} rank={1} />
              <div className="text-center">
                <p className="text-xs font-bold truncate">{top3[0].name.split(' ')[0]}</p>
                <p className="text-[10px]" style={{ color: '#475569' }}>{top3[0].college}</p>
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center justify-end pb-3 pt-4"
                style={{
                  height: 104,
                  background: 'linear-gradient(180deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))',
                  border: '1px solid rgba(251,191,36,0.2)',
                  borderBottom: 'none',
                  boxShadow: '0 -8px 24px rgba(251,191,36,0.08)',
                }}
              >
                <span className="text-2xl">🥇</span>
                <span className="font-black text-sm" style={{ color: '#fbbf24' }}>🔥{top3[0].streak}</span>
              </div>
            </div>

            {/* 3rd */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <Avatar name={top3[2].name} rank={3} />
              <div className="text-center">
                <p className="text-xs font-bold truncate">{top3[2].name.split(' ')[0]}</p>
                <p className="text-[10px]" style={{ color: '#475569' }}>{top3[2].college}</p>
              </div>
              <div
                className="w-full rounded-t-xl flex flex-col items-center justify-end pb-3 pt-4"
                style={{
                  height: 64,
                  background: 'linear-gradient(180deg, rgba(194,133,90,0.15), rgba(146,64,14,0.08))',
                  border: '1px solid rgba(194,133,90,0.2)',
                  borderBottom: 'none',
                }}
              >
                <span className="text-2xl">🥉</span>
                <span className="font-black text-sm" style={{ color: '#c2855a' }}>🔥{top3[2].streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl p-1 mb-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
              style={activeTab === t
                ? { background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }
                : { color: '#334155' }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Full list */}
        <div className="flex flex-col gap-1.5 mb-4">
          {rest.map((u) => (
            <div
              key={u.rank}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
              style={u.isMe ? {
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.22)',
                boxShadow: '0 0 20px rgba(99,102,241,0.08)',
              } : {
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Rank number */}
              <div
                className="w-7 text-center font-mono text-xs font-bold flex-shrink-0"
                style={{ color: u.isMe ? '#818cf8' : '#334155' }}
              >
                {u.rank}
              </div>

              <Avatar name={u.name} isMe={u.isMe} rank={u.rank} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold truncate" style={{ color: u.isMe ? '#f1f5f9' : '#94a3b8' }}>
                    {u.name}
                  </p>
                  {u.isMe && (
                    <span
                      className="text-[9px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
                    >
                      YOU
                    </span>
                  )}
                </div>
                <p className="text-[11px]" style={{ color: '#334155' }}>{u.college}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold" style={{ color: u.isMe ? '#f97316' : '#475569' }}>
                  🔥 {u.streak}
                </p>
                <p className="text-[10px]" style={{ color: '#1e293b' }}>day streak</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gap indicator */}
        {allUsers.slice(3, 15).length > 0 && (
          <div className="flex items-center gap-3 py-2 mb-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#1e293b' }}>
              ranks 16–43
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
