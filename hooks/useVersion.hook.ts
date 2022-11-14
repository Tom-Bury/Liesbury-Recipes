import { RootApi } from 'api/Root.api'
import { useEffect } from 'react'

export const useVersion = (): void => {
  useEffect(() => {
    ;(async () => {
      try {
        const res = await RootApi.version()
        console.log(`Backend: ${res}`)
      } catch (error) {
        console.error(`Could not connect with backend`, error)
      }
    })()
  }, [])
}
