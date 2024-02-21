import db from './database'
import { TRecipe } from './types/recipes.types'

export const getAllRecipeIds = async (): Promise<string[]> => {
  const allRecipeIds = await db.recipes.select().get()
  return allRecipeIds.docs.map(doc => doc.id)
}

export const getRecipeById = async (recipeId: string): Promise<TRecipe | undefined> => {
  const recipe = await db.recipes.doc(recipeId).get()
  return recipe.data() as TRecipe
}
