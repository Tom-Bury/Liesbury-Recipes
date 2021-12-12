import { URL, URLSearchParams } from 'url'
import db from './database'
import { TRecipe } from './types/recipes.types'

export const getLastNRecipes = async (n: number): Promise<TRecipe[]> => {
  const lastNRecipes = await db.recipes.limit(n).get()
  return lastNRecipes.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}

export const getAllRecipeIds = async (): Promise<string[]> => {
  const allRecipeIds = await db.recipes.select().get()
  return allRecipeIds.docs.map(doc => doc.id)
}

export const getRecipeById = async (recipeId: string): Promise<TRecipe | undefined> => {
  const recipe = await db.recipes.doc(recipeId).get()
  return recipe.data()
}
