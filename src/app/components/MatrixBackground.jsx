import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

export function MatrixBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let drops = []
    let raf

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 600
      const fontSize = 14
      const columns = Math.floor(canvas.width / fontSize)
      drops = []
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100
      }
    }

    init()

    const fontSize = 14
    const chars = '01'
    const trailColor   = isDark ? 'rgba(3, 7, 18, 0.05)'     : 'rgba(255, 255, 255, 0.18)'
    const charColor    = isDark ? 'rgba(168, 85, 247, 0.8)'  : 'rgba(109, 40, 217, 0.55)'

    const animate = () => {
      ctx.fillStyle = trailColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = charColor
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => init()
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
        opacity: isDark ? 0.4 : 0.22,
        zIndex: 0,
      }}
    />
  )
}
