import { useState, useEffect } from 'react'

export default function FocusTimerWidget() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 mins
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === 'work') {
        setMode('break')
        setTimeLeft(5 * 60) // 5 min break
      } else {
        setMode('work')
        setTimeLeft(25 * 60)
      }
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, timeLeft, mode])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60)
  }

  return (
    <div className="rounded-2xl p-3.5 glass border border-indigo-500/20 shadow-xl flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-mono font-bold flex-shrink-0 border ${
          isRunning ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        }`}>
          ⏱️
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-100">Coding Focus Timer</span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
              {mode === 'work' ? 'Sprint 25m' : 'Break 5m'}
            </span>
          </div>
          <p className="font-mono text-sm font-black text-amber-400 mt-0.5 tracking-wider">
            {timeString}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={toggleTimer}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isRunning
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md font-black'
          }`}
        >
          {isRunning ? 'Pause ⏸' : 'Start Focus ⚡'}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          title="Reset Timer"
          className="p-1.5 rounded-xl text-xs bg-slate-800 text-slate-400 hover:text-white"
        >
          🔄
        </button>
      </div>
    </div>
  )
}
