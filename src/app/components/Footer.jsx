import { motion } from 'motion/react'
import { Heart, Github, Linkedin, Mail, Twitter } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/amol-shinde', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:amolshinde3259@gmail.com', label: 'Email' },
]

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer style={{
      padding: '3rem 1.5rem',
      borderTop: '1px solid var(--border-footer)',
      background: 'var(--bg-footer)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{
              fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>&lt;AS/&gt;</div>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 240 }}>
              .NET Full Stack Developer passionate about building scalable, high-performance web applications.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.map((l) => (
                <a key={l.label} href={l.href} style={{ color: 'var(--text-faint)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-faint)'}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                  style={{
                    padding: '0.6rem',
                    background: 'var(--bg-icon-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.55rem',
                    color: 'var(--text-accent)', display: 'flex',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-icon-card)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem', borderTop: '1px solid rgba(168,85,247,0.08)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
        }}>
          <p style={{ color: 'var(--text-faintest)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={13} style={{ color: '#ec4899', fill: '#ec4899' }} /> by Amol Shinde
          </p>
          <p style={{ color: 'var(--text-faintest)', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Amol Shinde. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
