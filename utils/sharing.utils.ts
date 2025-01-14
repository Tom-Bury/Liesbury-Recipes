export const isWebShareAvailable = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }
  return typeof navigator.share === 'function' && typeof navigator.canShare === 'function'
}
