import { useState, useEffect } from 'react'

export function useMouse() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    px: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    py: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 2 - 1
      const y = -(e.clientY / innerHeight) * 2 + 1

      setMouse({
        x,
        y,
        px: e.clientX,
        py: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouse
}
