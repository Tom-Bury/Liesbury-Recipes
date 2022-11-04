import { ApiClient } from 'api/client'
import { TRecipe } from 'backend/types/recipes.types'

type TAddRecipeBody = {
  title: string
  url?: string
  imgUrl?: string
  previewImgFileData?: string
  instructions?: string
  ingredients?: string[]
  tips?: string
}

export const RecipesApi = {
  new: async (newRecipeData: TAddRecipeBody): Promise<{ id: string }> => {
    return ApiClient.post('recipes/new', {
      json: newRecipeData
    }).json()
  },

  search: async (query: string): Promise<TRecipe[]> => {
    return ApiClient.get('recipes/search', {
      searchParams: {
        query
      }
    }).json()
  }
}
