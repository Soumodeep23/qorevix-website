import React from 'react'
import QorevixLogo from './QorevixLogo'

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="nav-logo" onClick={() => scrollTo('#hero')}>
              <QorevixLogo height={38} />
            </div>
            <p className="footer-desc">
              Pioneering high-performance neural software engineering, real-time WebGL graphics, and next-gen digital systems.
            </p>
            <div className="footer-socials">
              <a href="#twitter" className="social-btn" aria-label="Twitter">
                𝕏
              </a>
              <a href="https://github.com/Soumodeep23/qorevix-website" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                GH
              </a>
              <a href="#linkedin" className="social-btn" aria-label="LinkedIn">
                IN
              </a>
              <a href="https://www.instagram.com/qorevix_technologies/"  target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}>Home</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services') }}>Capabilities</a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('#why-us') }}>Why Us</a>
              </li>
              <li>
                <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('#process') }}>Methodology</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Technology</h4>
            <ul className="footer-links">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}>Neural Core</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services') }}>3D Shaders</a></li>
              <li><a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('#why-us') }}>WASM Engine</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('#process') }}>Edge CDN</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Legal & Office</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Protocol</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security Audit</a></li>
              <li><a href="#contact">Kolkata, IN</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Qorevix Technologies Inc. All rights reserved.
          </div>
          <div className="footer-domain">qorevixtechnologies.in // v2.0.4-RELEASE</div>
        </div>
      </div>
    </footer>
  )
}
