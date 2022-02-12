import { EErrorCode } from 'types/enums'

type TAddRecipeBody = {
  title: string
  url?: string
  imgUrl?: string
  previewImgFileData?: string
  instructions?: string
  ingredients?: string[]
  tips?: string
}

type TAddRecipeResponse = {
  recipeId: string
  title: string
}

export const addRecipe = async (recipe: TAddRecipeBody): Promise<TAddRecipeResponse> => {
  try {
    const queryUrl = new URL('https://europe-west1-liesbury-recipes-322314.cloudfunctions.net/add-recipe')
    const res = await fetch(queryUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': window.location.origin
      },
      credentials: 'include',
      body: JSON.stringify(recipe)
    })

    switch (res.status) {
      case 200: {
        return (await res.json()) as TAddRecipeResponse
      }
      case 404: {
        throw new Error(EErrorCode.HTTP_404)
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

export const updateRecipe = async (recipe: TAddRecipeBody, recipeId: string): Promise<TAddRecipeResponse> => {
  try {
    const queryUrl = new URL('https://europe-west1-liesbury-recipes-322314.cloudfunctions.net/add-recipe')
    const res = await fetch(queryUrl.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': window.location.origin
      },
      credentials: 'include',
      body: JSON.stringify({ id: recipeId, ...recipe })
    })

    switch (res.status) {
      case 200: {
        return (await res.json()) as TAddRecipeResponse
      }
      case 404: {
        throw new Error(EErrorCode.HTTP_404)
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
