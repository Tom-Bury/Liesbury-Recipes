import { ApiClient } from 'api/client'

export const PreviewImageApi = {
  scrape: async (url: string): Promise<string> => {
    return ApiClient.get('preview-image/scrape', {
      searchParams: {
        url
      }
    }).text()
  }
}
