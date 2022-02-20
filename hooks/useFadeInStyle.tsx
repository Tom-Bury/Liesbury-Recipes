import { useState, useEffect } from 'react'

const useFadeInStyle = () => {
  const [fadedIn, setFadedIn] = useState(false)

  useEffect(() => {
    setFadedIn(true)
  })

  return `transition-opacity duration-300 ${fadedIn ? 'opacity-100' : 'opacity-0'}`
}

export default useFadeInStyle
