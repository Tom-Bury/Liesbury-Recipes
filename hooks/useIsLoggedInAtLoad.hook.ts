import { ApiClient } from 'api/client'
import { useEffect, useRef, useState } from 'react'

export const useIsLoggedInAtLoadDeferred = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(ApiClient.isLoggedIn())
  }, [])

  return isLoggedIn
}

export const useIsLoggedInAtLoad = (): boolean => {
  const isLoggedInRef = useRef(ApiClient.isLoggedIn())
  return Boolean(isLoggedInRef.current)
}
