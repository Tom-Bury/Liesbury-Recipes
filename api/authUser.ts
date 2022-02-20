import { EErrorCode } from 'types/enums'

const setCookie = (name: string, value: string, hours = 1) => {
  let expires = ''
  if (hours) {
    const date = new Date()
    date.setTime(date.getTime() + hours * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

type TAuthUserResponse = {
  token: string
  expiresInHours: number
}

const authUser = async (password: string): Promise<void> => {
  try {
    const queryUrl = new URL('https://europe-west1-liesbury-recipes-322314.cloudfunctions.net/auth-user')
    const res = await fetch(queryUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': window.location.origin
      },
      credentials: 'include',
      body: JSON.stringify({
        secret: password
      })
    })

    switch (res.status) {
      case 200: {
        const responseBody = (await res.json()) as TAuthUserResponse
        setCookie('authToken', responseBody.token, responseBody.expiresInHours)
        return
      }
      case 401: {
        throw new Error(EErrorCode.HTTP_401)
      }
      default: {
        throw new Error(EErrorCode.SERVER_ERROR)
      }
    }
  } catch (error) {
    throw new Error(EErrorCode.UNKNOWN_ERROR)
  }
}

export default authUser
