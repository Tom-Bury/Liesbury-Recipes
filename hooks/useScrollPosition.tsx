import { useState, useEffect } from 'react'

export const useScrollPosition = (): {
  scrollX: number
  scrollY: number
} => {
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { scrollX, scrollY }
}
