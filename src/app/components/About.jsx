import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Code, Database, Layers, Zap } from 'lucide-react'
import myPhoto from '../../imports/my photo.png'

const strengths = [
  { icon: Code, title: 'Frontend Development', desc: 'React.js, Next.js, TypeScript, Tailwind CSS for modern UIs' },
  { icon: Database, title: 'Backend & APIs', desc: 'ASP.NET Core, Web APIs, Entity Framework, Dapper, SQL Server' },
  { icon: Layers, title: 'Clean Architecture', desc: 'SOLID principles, design patterns, and maintainable code' },
  { icon: Zap, title: 'Agile Collaboration', desc: 'Team player in sprint planning and code reviews' },
]

function GeometricBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf
    const shapes = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 600
    }

    resize()

    const colors = [
      'rgba(168, 85, 247, 0.2)',
      'rgba(236, 72, 153, 0.2)',
      'rgba(59, 130, 246, 0.2)',
      'rgba(147, 51, 234, 0.2)',
    ]
    const types = ['square', 'triangle', 'hexagon']

    for (let i = 0; i < 15; i += 1) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const drawSquare = (x, y, size, rotation, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.strokeRect(-size / 2, -size / 2, size, size)
      ctx.restore()
    }

    const drawTriangle = (x, y, size, rotation, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, -size / 2)
      ctx.lineTo(size / 2, size / 2)
      ctx.lineTo(-size / 2, size / 2)
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()
    }

    const drawHexagon = (x, y, size, rotation, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i
        const px = (size / 2) * Math.cos(angle)
        const py = (size / 2) * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed

        if (shape.type === 'square') {
          drawSquare(shape.x, shape.y, shape.size, shape.rotation, shape.color)
        } else if (shape.type === 'triangle') {
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation, shape.color)
        } else {
          drawHexagon(shape.x, shape.y, shape.size, shape.rotation, shape.color)
        }
      })

      raf = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        zIndex: 0,
      }}
    />
  )
}

export function About() {
  return (
    <section id="about" style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <GeometricBackground />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: '#2563eb', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title gradient-text">About Me</h2>
          <div className="section-underline" style={{ marginTop: '0.5rem' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: 300, height: 300 }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)',
                borderRadius: '1.5rem', filter: 'blur(30px)', opacity: 0.3,
                animation: 'pulse-glow 3s ease-in-out infinite',
              }} />
              <div style={{
                position: 'relative', width: '120%', height: '150%',
                borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(168,85,247,0.3)',
                padding: 8,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '1.1rem',
                  overflow: 'hidden', background: '#0f0f1e',
                  border: '1px solid rgba(168,85,247,0.4)',
                }}>
                  <img
                    src={myPhoto}
                    alt="Amol Shinde"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.style.display = 'flex'
                      e.target.parentElement.style.alignItems = 'center'
                      e.target.parentElement.style.justifyContent = 'center'
                      e.target.parentElement.innerHTML = '<span style="font-size:5rem;font-weight:800;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AS</span>'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>My Journey</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                Motivated .NET Full Stack Developer with 1+ year of hands-on experience building and maintaining web applications and RESTful APIs using ASP.NET Core and Next.js, following Clean Architecture principles.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
                Currently working at Sthapatya Software on government-grade applications, I specialize in translating complex business requirements into secure, high-performance solutions. Passionate about clean code, SOLID principles, and creating applications that make a real impact.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {strengths.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-card"
                  style={{ padding: '1rem' }}
                >
                  <s.icon size={22} style={{ color: '#c084fc', marginBottom: '0.4rem' }} />
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{s.title}</h4>
                  <p style={{ fontSize: '0.73rem', color: 'var(--text-faint)', lineHeight: 1.5 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
