import { ApiClient } from 'api/client'

interface AuthLoginResponse {
  accessToken: string
}

export const AuthApi = {
  login: async (password: string): Promise<boolean> => {
    const { accessToken }: AuthLoginResponse = await ApiClient.post('auth/login', {
      json: {
        password
      }
    }).json()
    if (accessToken) {
      ApiClient.saveAccessToken(accessToken)
      return true
    }
    return false
  }
}
