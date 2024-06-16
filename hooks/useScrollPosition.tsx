import { useState, useEffect } from 'react'

export const useScrollPosition = (): {
  scrollX: number
  scrollY: number
} => {
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { scrollX, scrollY }
}
