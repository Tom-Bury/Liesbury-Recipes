import { RootApi } from 'api/Root.api'
import { useEffect } from 'react'

async function logBackendVersion() {
  try {
    const res = await RootApi.version()
    // eslint-disable-next-line no-console
    console.info(`Backend: ${res}`)
  } catch (error) {
    console.error(`Could not connect with backend`, error)
  }
}

export const useVersion = (): void => {
  useEffect(() => {
    logBackendVersion()
  }, [])
}
