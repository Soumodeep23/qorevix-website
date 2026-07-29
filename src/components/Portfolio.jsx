import React, { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import CaseStudyModal from './CaseStudyModal'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="portfolio" className="section portfolio" style={{ background: 'var(--bg-s)' }}>
      <div className="container">
        <div className="section-label">PORTFOLIO & CASE STUDIES</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          Featured <span className="text-gradient">Engineered Works</span>
        </h2>
        <p className="hero-sub" style={{ opacity: 1, margin: '0.8rem 0 3rem' }}>
          Click on any project to explore the full case study including problem statements, architecture, metrics, and live demos.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {portfolioData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="stat-card"
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(2, 2, 7, 0.8)',
                    backdropFilter: 'blur(8px)',
                    fontFamily: 'var(--font-m)',
                    fontSize: '0.7rem',
                    color: 'var(--blue-b)',
                    border: '1px solid var(--border-b)',
                  }}
                >
                  {project.category}
                </div>
              </div>

              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-s)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {project.tagline}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-m)', fontFamily: 'var(--font-m)' }}>
                    ⏱️ {project.caseStudy.timeTaken}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue-b)' }}>
                    Read Case Study →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
