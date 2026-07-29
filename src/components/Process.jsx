import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const processSteps = [
  {
    num: '01',
    tag: 'PHASE 01 // DISCOVERY',
    title: 'Neural Blueprinting & Audit',
    desc: 'We analyze your data assets, system bottlenecks, and technical requirements to design a tailored architectural blueprint.',
  },
  {
    num: '02',
    tag: 'PHASE 02 // ARCHITECTURE',
    title: 'Model & Engine Prototyping',
    desc: 'Constructing high-speed WebGL shaders, microservice routing maps, and custom AI pipeline prototypes for early benchmark validation.',
  },
  {
    num: '03',
    tag: 'PHASE 03 // DEVELOPMENT',
    title: 'Full-Stack Engine Assembly',
    desc: 'Building responsive React interfaces integrated with low-latency backend APIs and hardware-accelerated graphics shaders.',
  },
  {
    num: '04',
    tag: 'PHASE 04 // OPTIMIZATION',
    title: 'Neural Fine-Tuning & Stress Testing',
    desc: 'Rigorous load testing, memory profiling, and model quantization to guarantee maximum speed and rock-solid stability.',
  },
  {
    num: '05',
    tag: 'PHASE 05 // DEPLOYMENT',
    title: 'Autonomous Edge Launch',
    desc: 'Zero-downtime deployment to global edge CDN networks with continuous monitoring and automated telemetry alerts.',
  },
]

export default function Process() {
  const processRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger timeline highlight
      const steps = gsap.utils.toArray('.process-step')
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, processRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={processRef} className="section process">
      <div className="container">
        <div className="section-label">METHODOLOGY</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          From Concept to <span className="text-gradient">Production</span>
        </h2>

        <div className="process-steps">
          {processSteps.map((step) => (
            <div key={step.num} className="process-step">
              <div className="process-num-wrap">
                <div className="process-num">{step.num}</div>
              </div>
              <div>
                <div className="process-tag">{step.tag}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
