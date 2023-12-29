import db from './database'
import { TRecipe } from './types/recipes.types'

export const getLastNRecipes = async (n: number): Promise<TRecipe[]> => {
  const lastNRecipes = await db.recipes.limit(n).get()
  const sortedRecipeDocs = lastNRecipes.docs
  sortedRecipeDocs.sort((a, b) => b.updateTime.seconds - a.updateTime.seconds) // Sort most recently updated first
  return sortedRecipeDocs.map(doc => doc.data() as TRecipe).filter(recipe => !recipe.isPreview)
}

export const getAllRecipeIds = async (): Promise<string[]> => {
  const allRecipeIds = await db.recipes.select().get()
  return allRecipeIds.docs.map(doc => doc.id)
}

export const getRecipeById = async (recipeId: string): Promise<TRecipe | undefined> => {
  const recipe = await db.recipes.doc(recipeId).get()
  return recipe.data() as TRecipe
}
