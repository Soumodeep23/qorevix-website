import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, variant = 'primary', onClick, className = '' }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.5 })

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    rawX.set((e.clientX - cx) * 0.38)
    rawY.set((e.clientY - cy) * 0.38)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`mag-btn mag-btn-${variant} ${className}`}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span className="mag-btn-inner">{children}</span>
    </motion.button>
  )
}
