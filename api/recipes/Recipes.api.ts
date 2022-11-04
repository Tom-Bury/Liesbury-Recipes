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

  update: async (id: string, updatedRecipeData: TAddRecipeBody): Promise<{ id: string }> => {
    return ApiClient.put(`recipes/recipe/${id}`, {
      json: updatedRecipeData
    }).json()
  },

  delete: async (id: string): Promise<void> => {
    await ApiClient.delete(`recipes/recipe/${id}`).text()
  },

  search: async (query: string): Promise<TRecipe[]> => {
    return ApiClient.get('recipes/search', {
      searchParams: {
        query
      }
    }).json()
  }
}
