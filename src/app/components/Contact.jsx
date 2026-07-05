import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react'

const recipientEmail = 'amolshinde3259@gmail.com'

const contactInfo = [
  { icon: Mail, label: 'Email', value: recipientEmail, href: `mailto:${recipientEmail}` },
  { icon: Phone, label: 'Phone', value: '+91 7517979840', href: 'tel:+917517979840' },
  { icon: MapPin, label: 'Location', value: 'Pune – 411052, Maharashtra', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/amol-shinde', href: 'https://www.linkedin.com/in/amol-shinde' },
  { icon: Github, label: 'GitHub', value: 'github.com/amolshinde', href: 'https://github.com' },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          subject: form.subject || 'Portfolio contact form message',
          message: form.message,
          _subject: form.subject || 'New message from portfolio',
          _template: 'table',
          _captcha: 'false',
        }),
      })

      if (!response.ok) {
        throw new Error('Message could not be sent.')
      }

      setSent(true)
    } catch {
      setError('Message could not be sent right now. Please email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 450, height: 450, background: '#7c3aed', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.07, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <div className="section-underline" />
          <p style={{ color: 'var(--text-faint)', marginTop: '-2.5rem', marginBottom: '3.5rem', fontSize: '0.95rem' }}>
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Let's Connect</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 8 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.9rem',
                      padding: '0.75rem 1rem', borderRadius: '0.75rem',
                      background: 'var(--bg-contact-item)',
                      border: '1px solid var(--border-subtle)',
                      textDecoration: 'none',
                    }}
                    as={href ? 'a' : 'div'}
                    {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined } : {})}
                  >
                    <div style={{
                      padding: '0.5rem', borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="white" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{label}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ padding: '3rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
              >
                <div style={{ fontSize: '3rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thanks for reaching out. I'll get back to you soon!</p>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => { setSent(false); setError(''); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="btn-secondary"
                  style={{ marginTop: '0.5rem' }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { id: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
                  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project collaboration...' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{label}</label>
                    <input
                      name={id}
                      type={type}
                      value={form[id]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      placeholder={placeholder}
                      required
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-input)',
                        borderRadius: '0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem',
                        outline: 'none', transition: 'border-color 0.2s',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    style={{
                      width: '100%', padding: '0.75rem 1rem',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-input)',
                      borderRadius: '0.75rem', color: 'var(--text-primary)', fontSize: '0.9rem',
                      outline: 'none', resize: 'vertical',
                      fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}
                >
                  {sending ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 18, height: 18, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                  ) : <><Send size={18} /> Send Message</>}
                </motion.button>
                {error && (
                  <p style={{ color: '#fca5a5', fontSize: '0.85rem', textAlign: 'center' }}>
                    {error}{' '}
                    <a href={`mailto:${recipientEmail}`} style={{ color: '#f0abfc', fontWeight: 600 }}>
                      {recipientEmail}
                    </a>
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
