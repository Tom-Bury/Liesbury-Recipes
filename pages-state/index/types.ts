import { TRecipe } from 'backend/types/recipes.types'

export interface IndexPageURLFilters {
  searchQuery?: string
  selectedCategories: string[]
  showPreview: boolean
  focusedRecipeId?: string
}

export interface IndexPageFilters {
  searchQuery?: string
  categorySelections: { [key: string]: boolean }
  showPreview: boolean
  focusedRecipeId?: string
}

export interface IndexPageState {
  recipes?: TRecipe[]
  filtersKey: string
  searchQuery?: string
  showPreview: boolean
  categorySelections: { [key: string]: boolean }
  focusedRecipeId?: string
}
