import React from 'react'
import ReactDOM from 'react-dom/client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

// ── Register GSAP plugins ──────────────────────────────────
gsap.registerPlugin(ScrollTrigger)

// ── Lenis smooth scroll ────────────────────────────────────
const lenis = new Lenis({
  duration: 1.35,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
})

// Hook Lenis into GSAP ticker for ScrollTrigger compatibility
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Expose lenis globally so components can use it
window.__lenis = lenis

// ── Mount ─────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
