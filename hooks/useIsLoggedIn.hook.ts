import { ApiClient } from 'api/client'
import { useEffect, useState } from 'react'

/**
 * Hook that returns whether the user has a valid access token in its localstorage.
 * On the server, undefined will always be returned
 */
export const useIsLoggedIn = (): boolean | undefined => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoggedIn(undefined)
    } else {
      setIsLoggedIn(ApiClient.isLoggedIn())
    }
  }, [])

  return isLoggedIn
}
