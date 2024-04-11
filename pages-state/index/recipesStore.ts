import { TRecipe } from 'backend/types/recipes.types'
import create from 'zustand'
import { IndexPageFilters } from './types'

interface IndexPageRecipesState {
  recipes: TRecipe[]
  key?: string
  setRecipes: (key: string, newRecipes: TRecipe[]) => void
  resetRecipes: () => void
}

export const useIndexRecipesStore = create<IndexPageRecipesState>(set => ({
  recipes: [],
  setRecipes: (key, newRecipes) => set({ key, recipes: newRecipes }),
  resetRecipes: () => set({ recipes: [] })
}))

export const getRecipesKey = (filters: IndexPageFilters): string => {
  const filterHash = JSON.stringify({ ...filters, focusedRecipeId: undefined })
  return btoa(filterHash)
}
