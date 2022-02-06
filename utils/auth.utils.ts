export const isAuthTokenCookiePresent = (): boolean => {
  return !!document.cookie.match(/^(.*;)?\s*authToken\s*=\s*[^;]+(.*)?$/)
}
