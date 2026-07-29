import React, { useEffect, useRef, useState } from 'react'

const statsData = [
  { label: 'Latency Reduction', target: 99.4, suffix: '%', decimals: 1 },
  { label: 'Global Deployments', target: 250, suffix: '+', decimals: 0 },
  { label: 'Uptime SLA', target: 99.99, suffix: '%', decimals: 2 },
  { label: 'Active Neural Nodes', target: 12, suffix: 'M+', decimals: 0 },
]

function CountUp({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          let start = 0
          const duration = 2000
          const steps = 60
          const stepTime = duration / steps
          const increment = target / steps

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, stepTime)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" className="section why-us">
      <div className="container">
        <div className="section-label">WHY QOREVIX</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          Built for <span className="text-gradient">Performance</span> & Scale
        </h2>

        <div className="why-us-grid">
          {/* Feature list */}
          <div className="why-features reveal-left">
            <div className="why-feat">
              <div className="why-feat-icon">⚡</div>
              <div>
                <h4 className="why-feat-title">Sub-Millisecond Execution</h4>
                <p className="why-feat-text">
                  Our WebGL and WASM optimized architectures execute complex calculations directly on GPU threads.
                </p>
              </div>
            </div>

            <div className="why-feat">
              <div className="why-feat-icon">🔒</div>
              <div>
                <h4 className="why-feat-title">Zero-Trust Neural Security</h4>
                <p className="why-feat-text">
                  End-to-end encrypted neural model weights and cryptographically verified API handshakes.
                </p>
              </div>
            </div>

            <div className="why-feat">
              <div className="why-feat-icon">🌐</div>
              <div>
                <h4 className="why-feat-title">Edge Mesh Infrastructure</h4>
                <p className="why-feat-text">
                  Distributed intelligent edge nodes ensuring lightning-fast load times anywhere on earth.
                </p>
              </div>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="why-stats reveal-right">
            {statsData.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-val">
                  <CountUp target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
