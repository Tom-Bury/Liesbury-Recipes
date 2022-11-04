import { ApiClient } from './client'

export const RootApi = {
  version: async (): Promise<string> => {
    return ApiClient.get('').text()
  }
}
