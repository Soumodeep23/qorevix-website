import React from 'react'

const marqueeItems = [
  'NEURAL NETWORKS',
  'REACT THREE FIBER',
  'GSAP SCROLLTRIGGER',
  'SUB-MILLISECOND LATENCY',
  'WEBGL SHADERS',
  'LENIS SMOOTH SCROLL',
  'TYPESCRIPT OPTIMIZED',
  'AUTONOMOUS AGENTS',
]

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
