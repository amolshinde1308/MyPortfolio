import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

export function WaveBackground() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
    }
    resize()

    let time = 0
    let raf

    const waves = isDark
      ? [
          { amplitude: 30, frequency: 0.01,  speed: 0.02,  color: 'rgba(168, 85, 247, 0.3)' },
          { amplitude: 20, frequency: 0.015, speed: 0.015, color: 'rgba(236, 72, 153, 0.3)' },
          { amplitude: 25, frequency: 0.012, speed: 0.025, color: 'rgba(59, 130, 246, 0.3)'  },
        ]
      : [
          { amplitude: 30, frequency: 0.01,  speed: 0.02,  color: 'rgba(109, 40, 217, 0.2)' },
          { amplitude: 20, frequency: 0.015, speed: 0.015, color: 'rgba(190, 24, 93, 0.15)'  },
          { amplitude: 25, frequency: 0.012, speed: 0.025, color: 'rgba(29, 78, 216, 0.15)'  },
        ]

    const trailColor = isDark ? 'rgba(3, 7, 18, 0.05)' : 'rgba(255, 255, 255, 0.15)'

    const animate = () => {
      ctx.fillStyle = trailColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.stroke()
      })

      time += 1
      raf = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => { canvas.width = window.innerWidth }
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
        position: 'absolute', bottom: 0, left: 0, right: 0,
        pointerEvents: 'none',
        opacity: isDark ? 0.6 : 0.5,
        zIndex: 0,
      }}
    />
  )
}
