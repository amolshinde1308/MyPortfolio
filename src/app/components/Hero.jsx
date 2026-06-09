import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react'
import { ThreeScene } from './ThreeScene'
import { WaveBackground } from './WaveBackground'

function TypewriterText({ texts }) {
  const ref = useRef(null)
  useEffect(() => {
    let ti = 0, ci = 0, del = false, timeout
    const type = () => {
      if (!ref.current) return
      const cur = texts[ti]
      if (!del) {
        ref.current.textContent = cur.slice(0, ci + 1)
        ci++
        if (ci === cur.length) { del = true; timeout = setTimeout(type, 2000); return }
      } else {
        ref.current.textContent = cur.slice(0, ci - 1)
        ci--
        if (ci === 0) { del = false; ti = (ti + 1) % texts.length }
      }
      timeout = setTimeout(type, del ? 55 : 95)
    }
    timeout = setTimeout(type, 600)
    return () => clearTimeout(timeout)
  }, [texts])
  return (
    <span>
      <span ref={ref} style={{ color: '#c084fc' }} />
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: '#ec4899', fontWeight: 400 }}
      >|</motion.span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Blob backgrounds */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '5rem', left: '2.5rem', width: 320, height: 320, background: '#7c3aed', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(60px)', opacity: 0.15 }} />
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '8rem', right: '2.5rem', width: 320, height: 320, background: '#2563eb', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(60px)', opacity: 0.15 }} />
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '5rem', left: '50%', width: 320, height: 320, background: '#db2777', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(60px)', opacity: 0.15 }} />
        {/* Animated wave background */}
        <WaveBackground />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1 }}
          >
            <span style={{ color: '#f9fafb' }}>Hi, I'm </span>
            <span className="gradient-text">Amol Shinde</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#9ca3af', fontFamily: "'Fira Code', monospace", fontWeight: 400 }}
          >
            &gt; <TypewriterText texts={['.NET Full Stack Developer', 'ASP.NET Core Expert', 'React.js Developer', 'API Architect']} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: 'var(--text-faint)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.75 }}
          >
            Results-driven .NET Developer with expertise in delivering enterprise and government-grade web applications using ASP.NET Core, React.js, and modern frameworks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/amol-shinde', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:amolshinde3259@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                title={label}
                style={{
                  padding: '0.65rem',
                  background: 'var(--bg-icon-card)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: '0.6rem',
                  color: 'var(--text-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-icon-card)'; e.currentTarget.style.borderColor = 'var(--border-mid)' }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Three.js */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: 500 }}
          className="hero-three"
        >
          <div style={{
            width: '100%', height: '100%', borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.08), rgba(59,130,246,0.08))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(168,85,247,0.25)',
            boxShadow: '0 25px 60px rgba(168,85,247,0.15)',
            overflow: 'hidden',
          }}>
            <ThreeScene />
          </div>
          {/* Glow behind */}
          <div style={{
            position: 'absolute', top: 20, left: 20, right: -10, bottom: -10, zIndex: -1,
            borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.12))',
            filter: 'blur(30px)',
          }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: '#4b5563', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          fontFamily: "'Fira Code', monospace",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 22, height: 36, border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 5 }}
        >
          <div style={{ width: 3, height: 8, background: '#a855f7', borderRadius: 2 }} />
        </motion.div>
        Scroll
      </motion.div>

      <style>{`@media(max-width:768px){ .hero-three { display: none !important; } }`}</style>
    </section>
  )
}
