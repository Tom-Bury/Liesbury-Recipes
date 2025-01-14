import { useEffect, useState } from 'react'
import { isWebShareAvailable } from '~/utils/sharing.utils'

type SharingFunction = typeof navigator.share

const wrappedShare: SharingFunction = data => {
  return navigator.share(data).catch(error => {
    if (error && typeof error === 'object' && 'name' in error && String(error.name).toLowerCase() === 'aborterror') {
      return
    }
    throw error
  })
}

export const useSharing = (): SharingFunction | undefined => {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(isWebShareAvailable())
  }, [])

  return isEnabled ? wrappedShare : undefined
}
