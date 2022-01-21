import { EErrorCode } from 'types/enums'

type TGetPreviewImageResponse = {
  result: string
}

const getPreviewImage = async (url: string): Promise<string> => {
  try {
    const queryUrl = new URL('https://europe-west1-liesbury-recipes-322314.cloudfunctions.net/get-preview-image')
    queryUrl.search = new URLSearchParams({
      url
    }).toString()
    const res = await fetch(queryUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      credentials: 'include'
    })

    switch (res.status) {
      case 200: {
        const responseData = (await res.json()) as TGetPreviewImageResponse
        return responseData.result
      }
      case 404: {
        throw new Error(EErrorCode.HTTP_404)
      }
      default: {
        throw new Error(EErrorCode.SERVER_ERROR)
      }
    }
  } catch (error) {
    throw new Error(EErrorCode.UNKNOWN_ERROR)
  }
}

export default getPreviewImage
