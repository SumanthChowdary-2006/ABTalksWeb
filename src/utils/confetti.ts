// Lightweight, zero-dependency canvas confetti explosion helper
export function fireConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width
  canvas.height = height

  const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#818cf8']
  const count = 75
  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    rotation: number
    rotationSpeed: number
    opacity: number
  }> = []

  for (let i = 0; i < count; i++) {
    particles.push({
      x: width / 2,
      y: height / 2 - 50,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    })
  }

  let animationFrameId: number
  const startTime = Date.now()

  function render() {
    const elapsed = Date.now() - startTime
    if (elapsed > 2500 || !ctx) {
      canvas.remove()
      return
    }

    ctx.clearRect(0, 0, width, height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.35 // Gravity
      p.vx *= 0.98 // Air resistance
      p.rotation += p.rotationSpeed
      p.opacity = Math.max(0, 1 - elapsed / 2500)

      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
    })

    animationFrameId = requestAnimationFrame(render)
  }

  render()
}
