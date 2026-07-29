import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MagneticButton from '../MagneticButton'
import QorevixLogo from '../QorevixLogo'

export default function HeroText() {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Official Logo reveal
      tl.to(logoRef.current, { opacity: 1, duration: 0.8 })

      // Badge reveal
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')

      // Headline character stagger
      const chars = headlineRef.current.querySelectorAll('.char')
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 40, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.025,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
      }

      // Subtitle & CTAs
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const headlineText = 'Architecting Next-Gen Neural Systems & Digital Products'
  const words = headlineText.split(' ')

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
  }

  return (
    <div ref={containerRef} className="hero-content">
      {/* Official Qorevix Logo */}
      <div ref={logoRef} style={{ marginBottom: '2rem', opacity: 0 }}>
        <QorevixLogo height={90} />
      </div>

      {/* Badge */}
      <div ref={badgeRef} className="hero-badge" style={{ transform: 'translateY(10px)' }}>
        <span className="hero-badge-dot" />
        <span>Next-Generation AI & Software Studio</span>
      </div>

      {/* Headline character reveal */}
      <h1 ref={headlineRef} className="hero-headline">
        {words.map((word, wIdx) => (
          <span key={wIdx} className="word">
            {word.split('').map((char, cIdx) => (
              <span key={cIdx} className="char" style={{ color: '#ffffff' }}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* Subheadline */}
      <p ref={subRef} className="hero-sub" style={{ transform: 'translateY(15px)' }}>
        We fuse cutting-edge artificial intelligence, high-performance WebGL graphics, and sleek product design into transformative digital platforms.
      </p>

      {/* CTA Buttons */}
      <div ref={ctaRef} className="hero-ctas" style={{ transform: 'translateY(15px)' }}>
        <MagneticButton variant="primary" onClick={() => scrollTo('#services')}>
          Explore Ecosystem →
        </MagneticButton>
        <MagneticButton variant="ghost" onClick={() => scrollTo('#why-us')}>
          Our Technology
        </MagneticButton>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className="hero-scroll-hint">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">SCROLL TO DISCOVER</span>
      </div>
    </div>
  )
}
