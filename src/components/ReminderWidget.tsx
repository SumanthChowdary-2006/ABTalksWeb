import { useState, useEffect } from 'react'

interface ReminderWidgetProps {
  onToggleMessage?: (msg: string) => void
}

export default function ReminderWidget({ onToggleMessage }: ReminderWidgetProps) {
  const [reminderEnabled, setReminderEnabled] = useState(() => {
    return localStorage.getItem('abtalks_reminder') === 'true'
  })
  const [reminderTime, setReminderTime] = useState('22:00')

  useEffect(() => {
    localStorage.setItem('abtalks_reminder', reminderEnabled ? 'true' : 'false')
  }, [reminderEnabled])

  const handleToggle = () => {
    const nextState = !reminderEnabled
    setReminderEnabled(nextState)
    if (nextState) {
      onToggleMessage?.('⏰ Daily 10:00 PM Build Reminder Activated! Keep your streak alive.')
    } else {
      onToggleMessage?.('🔕 Daily Reminder Deactivated.')
    }
  }

  return (
    <div className="rounded-2xl p-3.5 glass border border-amber-500/20 flex items-center justify-between gap-3 shadow-lg">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 border ${
          reminderEnabled ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
        }`}>
          ⏰
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-slate-100 truncate">Daily 10:00 PM Build Alarm</h4>
          <p className="text-[10px] text-slate-400 truncate">
            {reminderEnabled ? 'Active • Notification set for 10:00 PM' : 'Never miss a streak deadline after college'}
          </p>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold flex-shrink-0 transition-all ${
          reminderEnabled
            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
            : 'bg-white/10 text-slate-300 hover:bg-white/20'
        }`}
      >
        {reminderEnabled ? 'ON ✓' : 'Set Alarm'}
      </button>
    </div>
  )
}
