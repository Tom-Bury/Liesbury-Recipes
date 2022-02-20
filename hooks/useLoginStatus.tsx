import { useState, useEffect } from 'react'
import { isAuthTokenCookiePresent } from '~/utils/auth.utils'

const useLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthTokenCookiePresent())
  })

  return isLoggedIn
}

export default useLoginStatus
