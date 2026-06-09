import { motion } from 'motion/react'
import { ExternalLink, Github } from 'lucide-react'
import { NetworkBackground } from './NetworkBackground'

const projects = [
  {
    title: 'Property Tax Management System',
    description: 'Government-grade web app for Municipal Corporation to automate property registration, tax assessment, billing, collection, and reporting.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75',
    tags: ['ASP.NET Core MVC', 'Web API', 'SQL Server', 'jQuery'],
    gradient: 'linear-gradient(135deg,#a855f7,#ec4899)',
  },
  {
    title: 'Smart Survey & Assessment System',
    description: 'Enterprise application for property survey and assessment with role-based access control and data integrity for Municipal Corporation.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75',
    tags: ['ASP.NET Core', 'Entity Framework', 'Dapper', 'AJAX'],
    gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
  },
  {
    title: 'Next.js Modern Web App',
    description: 'Modern frontend application with improved performance, SEO optimization, and seamless REST API integration using Next.js.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
  },
  {
    title: 'RESTful API Architecture',
    description: 'Clean Architecture based Web APIs with stored procedures, Dapper, and Entity Framework for optimal performance and maintainability.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=75',
    tags: ['.NET Core', 'Web API', 'Dapper', 'SQL Server'],
    gradient: 'linear-gradient(135deg,#f97316,#ef4444)',
  },
  {
    title: 'Full Stack Internship Project',
    description: 'Comprehensive full-stack web application developed during internship at Paarsh Infotech with React.js frontend and .NET backend.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75',
    tags: ['React.js', '.NET', 'JavaScript', 'Bootstrap'],
    gradient: 'linear-gradient(135deg,#ec4899,#f97316)',
  },
  {
    title: 'Payment & Billing Module',
    description: 'Integrated payment processing system with demand generation, payment history tracking, and automated receipt generation.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=75',
    tags: ['ASP.NET Core', 'SQL Server', 'jQuery', 'AJAX'],
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  },
]

export function Projects() {
  return (
    <section id="projects" style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Animated network graph background */}
      <NetworkBackground />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: '#db2777', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <div className="section-underline" />
          <p style={{ color: 'var(--text-faint)', marginTop: '-2.5rem', marginBottom: '3.5rem', fontSize: '0.95rem' }}>
            Showcasing my recent work and projects
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: p.gradient, opacity: 0.18, zIndex: 1 }} />
                <img
                  src={p.image} alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,7,18,0.9), rgba(3,7,18,0.3), transparent)', zIndex: 2 }} />
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-faint)', lineHeight: 1.65, flex: 1 }}>{p.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {p.tags.map((t) => <span key={t} className="tag" style={{ fontSize: '0.7rem' }}>{t}</span>)}
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.25rem' }}>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    style={{
                      flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                      background: p.gradient, color: 'white', textDecoration: 'none',
                      fontSize: '0.8rem', fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                    }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    style={{
                      padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                      background: 'var(--bg-icon-card)', color: 'var(--text-accent)',
                      border: '1px solid var(--border-mid)',
                      textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                    }}
                  >
                    <Github size={14} /> Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
