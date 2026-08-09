import { useState } from 'react'

interface LinkedInPreviewCardProps {
  studentName?: string
  college?: string
  dayNumber: number
  projectTitle: string
  githubUrl?: string
  learnings?: string
  onCopySuccess?: () => void
}

export default function LinkedInPreviewCard({
  studentName = 'Sumanth',
  college = 'BITS Pilani',
  dayNumber,
  projectTitle,
  githubUrl = 'https://github.com/sumanth_dev/abtalks-sprint',
  learnings,
  onCopySuccess
}: LinkedInPreviewCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)
  const [copied, setCopied] = useState(false)

  const postText = `🚀 Day ${dayNumber} of 60: Shipped "${projectTitle}" as part of @ABTalks 60-Day Coding Sprint!

${learnings ? `Key Learnings:\n${learnings}\n\n` : ''}📁 Proof of Work / GitHub Repo:
${githubUrl || 'https://github.com/sumanth_dev/abtalks-day-' + dayNumber}

#ABTalks #60DaysOfCode #BuildInPublic #WebDevelopment #CodingSprint #CollegeBuilders`

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard?.writeText?.(postText)
    setCopied(true)
    onCopySuccess?.()
    setTimeout(() => setCopied(false), 3000)
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(prev => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div className="rounded-2xl bg-slate-950 border border-indigo-500/30 p-4 text-slate-100 shadow-2xl overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
          <span>✨</span> Live LinkedIn Post Live Preview
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-all flex items-center gap-1"
        >
          <span>{copied ? '✓ Copied!' : '📋 Copy Post Text'}</span>
        </button>
      </div>

      {/* LinkedIn Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-xs flex-shrink-0 border border-white/20">
          {studentName.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-slate-100 truncate">{studentName}</h4>
            <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 font-semibold">1st</span>
          </div>
          <p className="text-[10px] text-slate-400 truncate">
            Student @ {college} • Building 60-Day Coding Challenge
          </p>
          <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
            <span>Just now</span> • <span>🌐</span>
          </p>
        </div>
      </div>

      {/* Post Text Body */}
      <div className="text-xs leading-relaxed text-slate-200 mb-3 whitespace-pre-line bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 font-sans">
        {postText}
      </div>

      {/* GitHub Attachment Box inside Post */}
      <div className="mb-3 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center gap-3 p-3">
        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-base flex-shrink-0">
          💻
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-slate-200 truncate">{projectTitle}</p>
          <p className="text-[9px] text-indigo-400 truncate">{githubUrl || 'github.com/sumanth_dev/abtalks'}</p>
        </div>
      </div>

      {/* Engagement Stats Bar */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 py-1.5 border-t border-b border-slate-800/80 mb-2">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">👍</span>
          <span>{likeCount} reactions</span>
        </div>
        <span>6 comments • 2 reposts</span>
      </div>

      {/* Interactive LinkedIn Social Buttons */}
      <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold">
        <button
          type="button"
          onClick={toggleLike}
          className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
            liked ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>👍</span>
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          type="button"
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          className="py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 flex items-center justify-center gap-1"
        >
          <span>💬</span>
          <span>Comment</span>
        </button>
        <button
          type="button"
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          className="py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 flex items-center justify-center gap-1"
        >
          <span>🔁</span>
          <span>Repost</span>
        </button>
        <button
          type="button"
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          className="py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 flex items-center justify-center gap-1"
        >
          <span>✈️</span>
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}
