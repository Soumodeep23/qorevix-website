import React from 'react'

const testimonials = [
  {
    quote:
      '“Qorevix transformed our legacy analytics platform into an ultra-fast, 3D interactive dashboard. Our user engagement shot up by 240% in the first quarter.”',
    author: 'Elena Rostova',
    role: 'VP of Product, Apex Data Labs',
    initials: 'ER',
    stars: 5,
  },
  {
    quote:
      '“The custom 3D web experience they built for our product launch stunned our investors. The attention to detail in shaders and micro-animations is unrivaled.”',
    author: 'Marcus Vance',
    role: 'Founder & CEO, Hyperion AI',
    initials: 'MV',
    stars: 5,
  },
  {
    quote:
      '“Sub-second load times alongside real-time neural model inference on client web browsers. Qorevix is years ahead in web graphics and architecture.”',
    author: 'Dr. Sarah Lin',
    role: 'Chief Architect, Quantum Systems',
    initials: 'SL',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div className="section-label">TESTIMONIALS</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          Trusted by <span className="text-gradient">Visionary Teams</span>
        </h2>

        <div className="testi-grid">
          {testimonials.map((item, idx) => (
            <div key={item.author} className={`testi-card reveal delay-${idx + 1}`}>
              <div className="testi-stars">
                {Array.from({ length: item.stars }).map((_, s) => (
                  <span key={s} className="star">
                    ★
                  </span>
                ))}
              </div>
              <p className="testi-quote">{item.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{item.initials}</div>
                <div>
                  <h4 className="testi-name">{item.author}</h4>
                  <p className="testi-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
