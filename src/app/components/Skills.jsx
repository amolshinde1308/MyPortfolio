import { motion } from 'motion/react'
import { Code, Database, Server, Wrench } from 'lucide-react'
import { MatrixBackground } from './MatrixBackground'

const skillCategories = [
  {
    icon: Code, title: 'Frontend', gradient: 'linear-gradient(135deg,#a855f7,#ec4899)',
    skills: [
      { name: 'React.js', level: 88 }, { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 82 }, { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    icon: Server, title: 'Backend', gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    skills: [
      { name: 'ASP.NET Core', level: 93 }, { name: 'Web APIs', level: 95 },
      { name: 'Entity Framework', level: 90 }, { name: 'Dapper', level: 88 },
    ],
  },
  {
    icon: Database, title: 'Database', gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    skills: [
      { name: 'SQL Server', level: 92 }, { name: 'ADO.NET', level: 85 },
      { name: 'MongoDB', level: 75 }, { name: 'LINQ', level: 90 },
    ],
  },
  {
    icon: Wrench, title: 'Tools', gradient: 'linear-gradient(135deg,#f97316,#ef4444)',
    skills: [
      { name: 'Git/GitHub', level: 88 }, { name: 'Visual Studio', level: 93 },
      { name: 'VS Code', level: 92 }, { name: 'Postman', level: 88 },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" style={{ padding: '5rem 1.5rem', background: 'var(--bg-section-a)', position: 'relative', overflow: 'hidden' }}>
      {/* Binary matrix rain background */}
      <MatrixBackground />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, background: '#7c3aed', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h2 className="section-title gradient-text">Skills & Technologies</h2>
          <div className="section-underline" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card"
              style={{ padding: '1.5rem', height: '100%' }}
            >
              <div style={{
                display: 'inline-flex', padding: '0.65rem', borderRadius: '0.75rem',
                background: cat.gradient, marginBottom: '1rem',
              }}>
                <cat.icon size={22} color="white" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>{cat.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{skill.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-accent)' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1 + si * 0.1, duration: 0.9, ease: 'easeOut' }}
                        style={{ height: '100%', borderRadius: 4, background: cat.gradient }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
