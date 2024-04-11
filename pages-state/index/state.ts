import { TRecipe } from 'backend/types/recipes.types'
import { NextRouter, useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { useEffect } from 'react'
import { enableKeys, listToMap } from '~/utils/general.utils'
import { nonNullable } from '~/utils/type.utils'
import { getRecipesKey, useIndexRecipesStore } from './recipesStore'
import { IndexPageFilters, IndexPageState, IndexPageURLFilters } from './types'

const fetchRecipes = async ({
  searchQuery,
  selectedCategories,
  showPreview
}: {
  searchQuery?: string
  selectedCategories: string[]
  showPreview: boolean
}): Promise<TRecipe[]> => {
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

const getIndexPageUrlFilters = (router: NextRouter): IndexPageURLFilters => {
  const { q: query, c: categories, p: preview } = router.query
  const urlParams = router.asPath.split('#')

  const searchQuery = query && typeof query === 'string' ? query : undefined

  const selectedCategories = Array.isArray(categories) ? categories : [categories].filter(nonNullable)

  const showPreview = preview === 'true'
  const focusedRecipeId = urlParams.length === 2 ? urlParams[1] : undefined

  return { searchQuery, selectedCategories, showPreview, focusedRecipeId }
}

const indexPageStateSetter = (router: NextRouter) => {
  return (filters: IndexPageFilters) => {
    const { searchQuery, categorySelections, showPreview, focusedRecipeId } = filters
    const selectedCategories = Object.keys(categorySelections).filter(category => categorySelections[category])

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
}

export const useIndexPageState = (allCategories: string[]): readonly [IndexPageState, (newFilters: IndexPageFilters) => void] => {
  const router = useRouter()
  const { searchQuery, selectedCategories, showPreview, focusedRecipeId } = getIndexPageUrlFilters(router)
  const categorySelections = enableKeys(listToMap(allCategories, false), selectedCategories)
  const filters: IndexPageFilters = { searchQuery, categorySelections, showPreview, focusedRecipeId }
  const filtersKey = getRecipesKey(filters)

  const recipes = useIndexRecipesStore(state => state.recipes)
  const currKey = useIndexRecipesStore(state => state.key)
  const setRecipes = useIndexRecipesStore(state => state.setRecipes)

  useEffect(() => {
    if (currKey !== filtersKey && router.isReady) {
      fetchRecipes({ searchQuery, selectedCategories, showPreview }).then(newRecipes => {
        setRecipes(filtersKey, newRecipes)
      })
    }
  }, [currKey, filtersKey, router.isReady, searchQuery, selectedCategories, setRecipes, showPreview])

  const state = { searchQuery, selectedCategories, showPreview, focusedRecipeId, recipes, categorySelections }
  return [state, indexPageStateSetter(router)] as const
}
