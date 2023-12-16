import { ApiClient } from 'api/client'
import { TCategory } from 'backend/types/category.types'
import { TRecipe } from 'backend/types/recipes.types'

type TAddRecipeBody = {
  title: string
  url?: string
  imgUrl?: string
  previewImgFileData?: string
  instructions?: string
  ingredients?: string[]
  categories?: Set<string>
  tips?: string
}

export const RecipesApi = {
  new: async (newRecipeData: TAddRecipeBody): Promise<{ id: string }> => {
    return ApiClient.post('recipes/new', {
      json: { ...newRecipeData, categories: [...(newRecipeData.categories || [])] }
    }).json()
  },

  update: async (id: string, updatedRecipeData: TAddRecipeBody): Promise<{ id: string }> => {
    return ApiClient.put(`recipes/recipe/${id}`, {
      json: { ...updatedRecipeData, categories: [...(updatedRecipeData.categories || [])] }
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
  },

  getRecipesForCategories: async (categories: string[]): Promise<TRecipe[]> => {
    return ApiClient.post('recipes/categories', {
      json: {
        query: categories
      }
    }).json()
  },

  getCategoryCounts: async (): Promise<TCategory[]> => {
    const categoryCounts: TCategory[] = await ApiClient.get('recipes/categories/counts').json()
    return categoryCounts.sort((a, b) => b.nbEntries - a.nbEntries)
  },

  getPreviewRecipes: async (): Promise<TRecipe[]> => {
    return ApiClient.get('recipes/preview').json()
  }
}
