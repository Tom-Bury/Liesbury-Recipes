export const isAuthTokenCookiePresent = (): boolean => {
  return !!document.cookie.match(/^(.*;)?\s*authToken\s*=\s*[^;]+(.*)?$/);
}

export const parseJwt = (token: string): Record<string, string | number> => {
  // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
