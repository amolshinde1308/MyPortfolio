import { motion } from 'motion/react'
import { Briefcase, Calendar, GraduationCap } from 'lucide-react'
import { HeroBackground } from './HeroBackground'

const experiences = [
  {
    type: 'work',
    role: 'Jr. Software Developer',
    company: 'Sthapatya Software Pvt. Ltd., Pune',
    duration: 'April 2025 – Present',
    description: 'Developing government-grade Property Tax Management System and Smart Survey & Assessment System for Municipal Corporation in Agile environment.',
    achievements: [
      'Built enterprise application using ASP.NET Core MVC with Clean Architecture',
      'Implemented Web APIs with SQL Server stored procedures for high performance',
      'Integrated role-based authentication and authorization for secure access',
      'Developed modules for property registration, tax assessment, and payment history',
      'Used Next.js for modern frontend with improved performance and SEO',
    ],
  },
  {
    type: 'work',
    role: '.NET & React.js Intern',
    company: 'Paarsh Infotech Pvt Ltd.',
    duration: '2024',
    description: 'Gained hands-on experience in full-stack web application development working on .NET and React.js projects.',
    achievements: [
      'Developed full-stack web applications using .NET and React.js',
      'Recognized as curious, quick-learning, and hardworking by mentors',
      'Demonstrated strong problem-solving and team collaboration skills',
      'Contributed to development tasks and participated in code reviews',
    ],
  },
  {
    type: 'edu',
    role: '.NET Full Stack Development',
    company: 'Seed Infotech, Pune',
    duration: '2023 – 2024',
    description: 'Comprehensive training in full-stack development with focus on .NET technologies and modern web frameworks.',
    achievements: [
      'Mastered ASP.NET Core, MVC, Web API, Entity Framework, and Dapper',
      'Learned React.js, JavaScript, TypeScript, and frontend technologies',
      'Built multiple full-stack projects demonstrating Clean Architecture',
      'Strong foundation in SOLID principles and design patterns',
    ],
  },
  {
    type: 'edu',
    role: 'Bachelor in Science (BSC)',
    company: 'Karmaveer Bhaurao Patil Mahavidyalaya, Pandharpur (Autonomous)',
    duration: '2019 – 2022',
    description: 'Completed Bachelor degree with strong academic performance.',
    achievements: [
      'Graduated with CGPA 7.78',
      'Built strong foundation in computer science fundamentals',
      'Participated in technical events and competitions',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" style={{ padding: '5rem 1.5rem', background: 'var(--bg-section-a)', position: 'relative', overflow: 'hidden' }}>
      {/* 3D particle starfield background */}
      <HeroBackground />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: '#2563eb', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.06, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
          <h2 className="section-title gradient-text">Experience & Education</h2>
          <div className="section-underline" />
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(to bottom, #a855f7, #ec4899, #3b82f6)',
            transform: 'translateX(-50%)',
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16,1,0.3,1] }}
              style={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '2.5rem',
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '50%', top: '1.5rem',
                width: 14, height: 14, background: '#a855f7',
                borderRadius: '50%', border: '3px solid #030712',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 12px rgba(168,85,247,0.6)',
              }} />

              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card"
                style={{ width: 'calc(50% - 2rem)', padding: '1.25rem', marginLeft: i % 2 === 0 ? 0 : undefined, marginRight: i % 2 === 0 ? undefined : 0 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-accent)', fontSize: '0.78rem', marginBottom: '0.6rem' }}>
                  <Calendar size={13} />
                  {exp.duration}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    padding: '0.45rem',
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    borderRadius: '0.5rem', flexShrink: 0,
                  }}>
                    {exp.type === 'work' ? <Briefcase size={16} color="white" /> : <GraduationCap size={16} color="white" />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>{exp.role}</h3>
                    <p style={{ color: 'var(--text-accent)', fontSize: '0.82rem', fontWeight: 500 }}>{exp.company}</p>
                  </div>
                </div>

                <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{exp.description}</p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {exp.achievements.map((a, ai) => (
                    <li key={ai} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: '#a855f7', marginTop: 2, flexShrink: 0 }}>▸</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:640px){
        .exp-timeline-line { display: none !important; }
      }`}</style>
    </section>
  )
}
