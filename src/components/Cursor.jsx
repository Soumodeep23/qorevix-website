import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let glowX = -100, glowY = -100
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      glow.style.opacity = '1'
    }

    const tick = () => {
      // Ring follows with soft lag
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'

      // Glow follows even slower
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.left = glowX + 'px'
      glow.style.top = glowY + 'px'

      raf = requestAnimationFrame(tick)
    }
    tick()

    // Global Event Delegation for Interactive Elements (including dynamically rendered Modal elements)
    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest(
        'a, button, input, select, textarea, [role="button"], .service-card, .testi-card, .stat-card, .why-feat, .mag-btn, .process-step'
      )
      if (interactiveEl) {
        ring.classList.add('hovered')
      }
    }

    const handleMouseOut = (e) => {
      const interactiveEl = e.target.closest(
        'a, button, input, select, textarea, [role="button"], .service-card, .testi-card, .stat-card, .why-feat, .mag-btn, .process-step'
      )
      if (interactiveEl) {
        ring.classList.remove('hovered')
      }
    }

    const clickStart = () => dot.classList.add('clicked')
    const clickEnd = () => dot.classList.remove('clicked')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mousedown', clickStart)
    document.addEventListener('mouseup', clickEnd)

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      glow.style.opacity = '0'
    })
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      glow.style.opacity = '1'
    })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', clickStart)
      document.removeEventListener('mouseup', clickEnd)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  )
}
