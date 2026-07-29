import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { servicesData } from '../data/servicesData'

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 280,
    damping: 25,
  })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="service-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service-card-glow-line" />
      <div className="service-icon">{service.icon}</div>
      <div className="service-num">{service.num}</div>
      <h3 className="service-name">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      
      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {service.features.map((feat, fIdx) => (
          <span
            key={fIdx}
            style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: '9999px',
              background: 'var(--glow-s)',
              border: '1px solid var(--border-b)',
              color: 'var(--blue-b)',
              fontFamily: 'var(--font-m)',
            }}
          >
            ✓ {feat}
          </span>
        ))}
      </div>

      <div className="service-arrow" style={{ marginTop: '1.5rem' }}>
        Request Quote <span>→</span>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Development', 'Artificial Intelligence', 'Enterprise', 'Automation', 'Cloud']

  const filteredServices =
    activeCategory === 'All'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory)

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-label">CAPABILITIES</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          11 Premium <span className="text-gradient">Core Services</span>
        </h2>
        <p className="hero-sub" style={{ opacity: 1, margin: '0.8rem 0 2rem' }}>
          Engineered for fast-growing startups and enterprises. Hover over any capability to experience the 3D interaction.
        </p>

        {/* Filter categories */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'var(--font-b)',
                cursor: 'pointer',
                background: activeCategory === cat ? 'var(--blue)' : 'var(--bg-s)',
                color: activeCategory === cat ? '#fff' : 'var(--text-s)',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--blue-b)' : 'var(--border)',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className="services-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
