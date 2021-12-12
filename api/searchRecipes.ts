import { TRecipe } from 'backend/types/recipes.types'

const searchRecipes = async (query: string): Promise<TRecipe[]> => {
  try {
    const queryUrl = new URL('https://europe-west1-liesbury-recipes-322314.cloudfunctions.net/search-recipes')
    queryUrl.search = new URLSearchParams({
      search: query
    }).toString()
    const res = await fetch(queryUrl.toString())
    const recipes = (await res.json()) as TRecipe[]
    return recipes
  } catch (error) {
    // TODO: error handling
    return []
  }
}

export default searchRecipes
