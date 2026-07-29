import { useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import QorevixLogo from './QorevixLogo'

export default function Nav({ onOpenClientPortal, onOpenAdminPortal }) {
  const navRef = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(id)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
  }

  return (
    <header>
      <nav ref={navRef} className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}>
            <QorevixLogo height={40} />
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links" role="list">
            {[
              ['#services', 'Services'],
              ['#portfolio', 'Portfolio'],
              ['#order-wizard', 'Order System'],
              ['#why-us', 'Why Us'],
              ['#process', 'Process'],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {/* Client Portal & Admin buttons temporarily hidden - can be restored easily anytime
            <button
              onClick={onOpenClientPortal}
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-s)',
                cursor: 'pointer',
                padding: '0.5rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-gl)',
                fontWeight: 500,
              }}
            >
              Client Portal 👤
            </button>
            <button
              onClick={onOpenAdminPortal}
              style={{
                fontSize: '0.82rem',
                color: 'var(--purple-b)',
                cursor: 'pointer',
                padding: '0.5rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-b)',
                background: 'var(--pglow)',
                fontWeight: 500,
              }}
            >
              Admin ⚡
            </button>
            */}

            <MagneticButton variant="primary" onClick={() => scrollTo('#order-wizard')}>
              Order Website →
            </MagneticButton>

            {/* Mobile Hamburger Menu Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                fontSize: '1.4rem',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(2, 2, 7, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              zIndex: 9999,
            }}
          >
            {[
              ['#services', 'Services'],
              ['#portfolio', 'Portfolio'],
              ['#order-wizard', 'Order System'],
              ['#why-us', 'Why Us'],
              ['#process', 'Process'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)' }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
