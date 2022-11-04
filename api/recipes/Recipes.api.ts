import { ApiClient } from 'api/client'
import { TRecipe } from 'backend/types/recipes.types'

export const RecipesApi = {
  search: async (query: string): Promise<TRecipe[]> => {
    return ApiClient.get('recipes/search', {
      searchParams: {
        query
      }
    }).json()
  }
}
