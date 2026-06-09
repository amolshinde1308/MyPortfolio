import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

export function NetworkBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes = []
    let raf

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 600
      nodes = []
      for (let i = 0; i < 50; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
        })
      }
    }

    init()

    const trailColor  = isDark ? 'rgba(3, 7, 18, 0.05)'    : 'rgba(255, 255, 255, 0.18)'
    const nodeColor   = isDark ? 'rgba(168, 85, 247, 0.6)'  : 'rgba(109, 40, 217, 0.45)'
    const lineAlpha   = isDark ? 0.3 : 0.18

    const animate = () => {
      ctx.fillStyle = trailColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()

        nodes.forEach((other, j) => {
          if (i === j) return
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = isDark
              ? `rgba(168, 85, 247, ${lineAlpha - dist / 500})`
              : `rgba(109, 40, 217, ${lineAlpha - dist / 900})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

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
        opacity: isDark ? 0.6 : 0.3,
        zIndex: 0,
      }}
    />
  )
}
