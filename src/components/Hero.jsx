import React from 'react'
import HeroText from './hero/HeroText'
import Scene3D from './hero/Scene3D'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg-glow" />
      <div className="hero-grid" />
      <HeroText />
      <Scene3D />
    </section>
  )
}
