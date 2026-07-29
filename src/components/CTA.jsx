import React, { useState } from 'react'
import MagneticButton from './MagneticButton'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section id="contact" className="section cta-section">
      <div className="cta-glow-bg" />
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-label">READY TO ELEVATE?</div>
          <h2 className="cta-headline">
            Ready to Build the <span className="text-gradient">Future</span>?
          </h2>
          <p className="cta-sub">
            Let’s collaborate to architect your next high-performance digital product or neural platform.
          </p>

          {submitted ? (
            <div
              style={{
                padding: '1.2rem 2rem',
                background: 'rgba(45, 126, 255, 0.1)',
                border: '1px solid var(--blue-b)',
                borderRadius: '9999px',
                color: '#fff',
                fontFamily: 'var(--font-d)',
                fontWeight: 600,
                display: 'inline-block',
              }}
            >
              🎉 Request received! Our team will reach out within 2 hours.
            </div>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="cta-input"
                placeholder="Enter your corporate email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MagneticButton variant="primary" onClick={handleSubmit}>
                Book a Demo →
              </MagneticButton>
            </form>
          )}

          <p className="cta-meta">
            Strict NDA guaranteed. Or reach us directly at{' '} 
            <a href="mailto:founder@qorevixtechnologies.in">founder@qorevixtechnologies.in</a> or {' '}
            <a href="mailto:cofounder@qorevixtechnologies.in">cofounder@qorevixtechnologies.in</a>
          </p>
        </div>
      </div>
    </section>
  )
}
