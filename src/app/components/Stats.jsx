import { motion } from 'motion/react'
import { useEffect, useState, useRef } from 'react'

function StatCard({ stat, index }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        const steps = 50, stepVal = stat.value / steps, stepDur = stat.duration / steps
        let step = 0
        const t = setInterval(() => {
          step++
          setCount(Math.min(Math.round(stepVal * step), stat.value))
          if (step >= steps) clearInterval(t)
        }, stepDur)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [stat, started])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.08 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: '0.25rem',
      }}>
        {count}{stat.suffix}
      </div>
      <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>{stat.label}</p>
    </motion.div>
  )
}

export function Stats() {
  const stats = [
    { value: 1, suffix: '+', label: 'Years Experience', duration: 800 },
    { value: 10, suffix: '+', label: 'Projects Completed', duration: 1000 },
    { value: 15, suffix: '+', label: 'Technologies', duration: 1200 },
    { value: 100, suffix: '%', label: 'Client Satisfaction', duration: 1400 },
  ]

  return (
    <section style={{
      padding: '3.5rem 1.5rem',
      background: 'var(--bg-stats)',
      borderTop: '1px solid var(--border-stats)',
      borderBottom: '1px solid var(--border-stats)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
