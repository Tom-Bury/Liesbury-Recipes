import ky from 'ky'
import { parseJwt } from 'utils/auth.utils'
import { IS_DEV } from 'utils/dev.utils'

const API_URL = IS_DEV ? 'http://localhost:8888' : 'https://lb-recipes-backend-u2i4fxh5ga-ew.a.run.app'

export class ApiClient {
  private static apiAccessTokenLocalStorageKey = 'apiAccessToken'

  private static client = ky.extend({
    prefixUrl: API_URL,
    hooks: {
      beforeRequest: [
        request => {
          if (typeof window !== 'undefined') {
            request.headers.append('Access-Control-Allow-Origin', window.location.origin)
            ApiClient.checkAuthToken()
            const accessToken = localStorage.getItem(ApiClient.apiAccessTokenLocalStorageKey)
            if (accessToken && accessToken.length > 0) {
              request.headers.append('Authorization', `Bearer ${accessToken}`)
            }
          }
        }
      ]
      // afterResponse: [
      //   response => {
      //     // Do something after every response
      //     // For example, check status code etc...
      //   }
      // ]
    }
  })

  public static get = ApiClient.client.get

  public static post = ApiClient.client.post

  public static put = ApiClient.client.put

  public static delete = ApiClient.client.delete

  public static saveAccessToken = (accessToken: string): void => {
    localStorage.setItem(ApiClient.apiAccessTokenLocalStorageKey, accessToken)
  }

  public static isLoggedIn = (): boolean => {
    ApiClient.checkAuthToken()
    const accessToken = localStorage.getItem(ApiClient.apiAccessTokenLocalStorageKey)
    return Boolean(accessToken)
  }

  private static checkAuthToken = () => {
    try {
      const accessToken = localStorage.getItem(ApiClient.apiAccessTokenLocalStorageKey)
      if (accessToken && accessToken.length > 0) {
        const { exp } = parseJwt(accessToken)
        const expMillis = parseInt(`${exp}`, 10) * 1000
        if (expMillis < Date.now()) {
          localStorage.removeItem(ApiClient.apiAccessTokenLocalStorageKey)
        }
      }
    } catch (error) {
      console.error(`Could not check auth token: ${error}`)
      localStorage.removeItem(ApiClient.apiAccessTokenLocalStorageKey)
    }
  }
}
