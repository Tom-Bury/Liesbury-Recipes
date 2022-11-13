import { RootApi } from 'api/Root.api'
import { useEffect } from 'react'

export const useVersion = (): void => {
  useEffect(() => {
    ;(async () => {
      const res = await RootApi.version()
      console.log(`Backend: ${res}`)
    })()
  }, [])
}
