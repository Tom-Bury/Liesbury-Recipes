import { useState, useEffect } from 'react'
import { isAuthTokenCookiePresent } from '~/utils/auth.utils'

const useLoginStatus = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthTokenCookiePresent())
  })

  return isLoggedIn
}

export default useLoginStatus
