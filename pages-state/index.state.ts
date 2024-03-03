import { TRecipe } from 'backend/types/recipes.types'
import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { enableKeys, listToMap } from '~/utils/general.utils'
import { nonNullable } from '~/utils/type.utils'

type TIndexPageFilterState = {
  searchQuery?: string
  selectedCategories: string[]
  showPreview: boolean
  focusedRecipeId?: string
}

type TIndexPageState = TIndexPageFilterState & {
  recipes?: TRecipe[]
  categorySelections: { [key: string]: boolean }
}

const fetchRecipes = async ({ searchQuery, selectedCategories, showPreview }: TIndexPageFilterState): Promise<TRecipe[]> => {
  if (showPreview) {
    return RecipesApi.getPreviewRecipes()
  }
  if (searchQuery) {
    return RecipesApi.search(searchQuery)
  }
  if (selectedCategories.length > 0) {
    return RecipesApi.getRecipesForCategories(selectedCategories)
  }
  return RecipesApi.all()
}

const indexPageStateSetter = (router: NextRouter) => (newState: TIndexPageFilterState) => {
  const { searchQuery, selectedCategories, showPreview, focusedRecipeId } = newState

  const newQuery = {
    ...(searchQuery ? { q: searchQuery } : {}),
    ...(!searchQuery && selectedCategories ? { c: selectedCategories } : {}),
    ...(showPreview ? { p: 'true' } : {})
  }

  const newHash = focusedRecipeId ? { hash: focusedRecipeId } : {}

  // Check if the new state would change the URL
  if (JSON.stringify(router.query) !== JSON.stringify(newQuery) || router.asPath.split('#')[1] !== newHash.hash) {
    router
      .replace(
        {
          query: newQuery,
          ...newHash
        },
        undefined,
        { scroll: false, shallow: true }
      )
      .catch(error => console.error('Error updating index page state', error))
  }
}

export const useIndexPageState = (
  initialRecipes: TRecipe[],
  allCategories: string[]
): readonly [TIndexPageState, (newState: TIndexPageFilterState) => void] => {
  const router = useRouter()
  const { q: query, c: categories, p: preview } = router.query
  const urlParams = router.asPath.split('#')

  const searchQuery = query && typeof query === 'string' ? query : undefined

  const selectedCategories = Array.isArray(categories) ? categories : [categories].filter(nonNullable)
  const categorySelections = enableKeys(listToMap(allCategories, false), selectedCategories)

  const showPreview = preview === 'true'
  const focusedRecipeId = urlParams.length === 2 ? urlParams[1] : undefined

  const [recipes, setRecipes] = useState<TRecipe[] | undefined>(initialRecipes)

  useEffect(() => {
    const updateRecipes = async () => {
      const useEffectSelectedCategories = Array.isArray(categories) ? categories : [categories].filter(nonNullable)
      setRecipes(await fetchRecipes({ searchQuery, selectedCategories: useEffectSelectedCategories, showPreview }))
    }

    updateRecipes()
  }, [searchQuery, categories, showPreview])

  const state = { searchQuery, selectedCategories, showPreview, focusedRecipeId, recipes, categorySelections }
  return [state, indexPageStateSetter(router)] as const
}
