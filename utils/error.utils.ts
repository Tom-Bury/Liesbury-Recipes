import { HTTPError } from 'ky'

export const getApiErrorCode = (error: unknown): number => {
  return error instanceof HTTPError ? error.response.status : -1
}
