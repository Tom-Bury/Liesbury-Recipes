import ky from 'ky'
import { parseJwt } from '~/utils/auth.utils'

const API_URL = 'https://lb-recipes-backend-u2i4fxh5ga-ew.a.run.app'

export class ApiClient {
  private static apiAccessTokenLocalStorageKey = 'apiAccessToken'

  private static client = ky.extend({
    prefixUrl: API_URL,
    hooks: {
      beforeRequest: [
        request => {
          request.headers.append('Access-Control-Allow-Origin', window.location.origin)
          this.checkAuthToken()
          const accessToken = localStorage.getItem(this.apiAccessTokenLocalStorageKey)
          if (accessToken && accessToken.length > 0) {
            request.headers.append('Authorization', `Bearer ${accessToken}`)
          }
        }
      ],
      afterResponse: [
        response => {
          // Do something after every response
          // For example, check status code etc...
        }
      ]
    }
  })

  public static get = this.client.get

  public static post = this.client.post

  public static saveAccessToken = (accessToken: string): void => {
    localStorage.setItem(this.apiAccessTokenLocalStorageKey, accessToken)
  }

  public static isLoggedIn = (): boolean => {
    this.checkAuthToken()
    const accessToken = localStorage.getItem(this.apiAccessTokenLocalStorageKey)
    return Boolean(accessToken)
  }

  private static checkAuthToken = () => {
    try {
      const accessToken = localStorage.getItem(this.apiAccessTokenLocalStorageKey)
      if (accessToken && accessToken.length > 0) {
        const { exp } = parseJwt(accessToken)
        const expMillis = parseInt(`${exp}`, 10) * 1000
        if (expMillis < Date.now()) {
          localStorage.removeItem(this.apiAccessTokenLocalStorageKey)
        }
      }
    } catch (error) {
      console.error(`Could not check auth token: ${error}`)
      localStorage.removeItem(this.apiAccessTokenLocalStorageKey)
    }
  }
}
