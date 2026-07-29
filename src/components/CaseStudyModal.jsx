import React, { useEffect } from 'react'

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return

    // Stop Lenis smooth scroll on main page & lock body scroll
    if (window.__lenis) {
      window.__lenis.stop()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      if (window.__lenis) {
        window.__lenis.start()
      }
      document.body.style.overflow = prevOverflow
    }
  }, [project])

  if (!project) return null

  const { caseStudy } = project

  return (
    <div
      data-lenis-prevent
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(2, 2, 7, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-s)',
          border: '1px solid var(--border-b)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 0 60px rgba(45, 126, 255, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-gl)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close Case Study Modal"
        >
          ✕
        </button>

        <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.72rem', color: 'var(--blue)', letterSpacing: '0.15em' }}>
          CASE STUDY // {project.category.toUpperCase()}
        </div>
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0 1rem', color: '#fff' }}>
          {project.title}
        </h2>

        {/* Hero image preview */}
        <div style={{ width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.2rem',
          }}
        >
          {caseStudy.stats.map((st, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue-b)' }}>
                {st.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-s)' }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Problem & Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-d)', color: 'var(--blue-b)', marginBottom: '0.5rem' }}>⚠️ Problem Statement</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-s)', lineHeight: 1.7 }}>{caseStudy.problem}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-d)', color: 'var(--purple-b)', marginBottom: '0.5rem' }}>✨ Engine Solution</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-s)', lineHeight: 1.7 }}>{caseStudy.solution}</p>
          </div>
        </div>

        {/* Technologies & Time Taken */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-d)', marginBottom: '0.8rem', color: 'var(--text)' }}>
            🛠️ Technologies & Timeline ({caseStudy.timeTaken})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '4px 12px',
                  borderRadius: '8px',
                  background: 'var(--glow-s)',
                  border: '1px solid var(--border-b)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-m)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Client Review Quote */}
        {caseStudy.clientReview && (
          <div
            style={{
              padding: '1.5rem',
              background: 'var(--bg)',
              borderLeft: '3px solid var(--blue)',
              borderRadius: '8px',
              marginBottom: '2rem',
            }}
          >
            <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-s)', marginBottom: '0.8rem' }}>
              {caseStudy.clientReview.quote}
            </p>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)' }}>
              {caseStudy.clientReview.author} — <span style={{ color: 'var(--text-m)' }}>{caseStudy.clientReview.role}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {caseStudy.demoUrl && (
            <a
              href={caseStudy.demoUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '0.8rem 1.8rem',
                borderRadius: '9999px',
                background: 'var(--blue)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Launch Live Demo 🚀
            </a>
          )}
          {caseStudy.githubUrl && (
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '0.8rem 1.8rem',
                borderRadius: '9999px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-s)',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              View GitHub Repo 💻
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
