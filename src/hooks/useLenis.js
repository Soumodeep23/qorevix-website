import { useEffect, useState } from 'react'

export function useLenis(callback) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenisInstance = window.__lenis
    if (lenisInstance) {
      setLenis(lenisInstance)
      if (callback) {
        lenisInstance.on('scroll', callback)
        return () => lenisInstance.off('scroll', callback)
      }
    }
  }, [callback])

  return lenis
}
