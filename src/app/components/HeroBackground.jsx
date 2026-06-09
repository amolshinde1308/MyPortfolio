import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

export function HeroBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }
    resize()

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vz: Math.random() * 2 + 1,
      })
    }

    const trailColor = isDark ? 'rgba(3, 7, 18, 0.1)' : 'rgba(255, 255, 255, 0.2)'
    const particleStop0 = isDark ? 'rgba(168, 85, 247, 0.8)' : 'rgba(109, 40, 217, 0.6)'

    const animate = () => {
      ctx.fillStyle = trailColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.z -= p.vz
        if (p.z <= 0) {
          p.z = 1000
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
        }

        const scale = 1000 / (1000 + p.z)
        const x = (p.x - canvas.width / 2) * scale + canvas.width / 2
        const y = (p.y - canvas.height / 2) * scale + canvas.height / 2
        const size = (1 - p.z / 1000) * 3

        const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
        grad.addColorStop(0, particleStop0)
        grad.addColorStop(1, 'rgba(168, 85, 247, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }
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
        opacity: isDark ? 0.7 : 0.3,
        zIndex: 0,
      }}
    />
  )
}
