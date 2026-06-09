import { motion } from 'motion/react'
import { SiDotnet, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiGit, SiPostman, SiJavascript, SiSqlite, SiVisualparadigm } from 'react-icons/si'
import { MatrixBackground } from './MatrixBackground'

const technologies = [
  { icon: SiDotnet, name: 'C#', color: '#512BD4' },
  { icon: SiDotnet, name: '.NET Core', color: '#512BD4' },
  { icon: SiReact, name: 'React.js', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiSqlite, name: 'SQL Server', color: '#CC2927' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
  { icon: SiVisualparadigm, name: 'VS Code', color: '#007ACC' },
  { icon: SiPostman, name: 'Postman', color: '#FF6C37' },
]

export function TechStack() {
  return (
    <section style={{ padding: '3.5rem 1.5rem', background: 'var(--bg-section-b)', position: 'relative', overflow: 'hidden' }}>
      {/* Binary matrix rain background */}
      <MatrixBackground />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Tech Stack</h3>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>Technologies I work with every day</p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem' }}>
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.2, y: -10 }}
              style={{ position: 'relative' }}
              className="tech-item"
            >
              <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.4rem', width: 72, height: 72 }}>
                <tech.icon size={32} style={{ color: tech.color }} />
              </div>
              <div className="tech-tooltip">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .tech-item:hover .tech-tooltip { opacity: 1; }
        .tech-tooltip {
          position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
          opacity: 0; transition: opacity 0.2s;
          white-space: nowrap; background: rgba(15,15,30,0.95);
          color: #c084fc; font-size: 0.7rem; padding: 0.2rem 0.6rem;
          border-radius: 4px; border: 1px solid rgba(168,85,247,0.2);
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}
