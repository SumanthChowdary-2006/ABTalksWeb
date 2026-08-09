import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark / Light Theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 shadow-md active:scale-90"
      style={{
        background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(15, 23, 42, 0.15)',
        color: isDark ? '#fbbf24' : '#6366f1'
      }}
    >
      <span className="transition-transform duration-300 hover:rotate-45">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
