import { TRecipe } from 'backend/types/recipes.types'
import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { arraysHaveSameContents, enableKeys, listToMap, sleep } from '~/utils/general.utils'
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
  router.replace(
    {
      query: {
        ...(searchQuery ? { q: searchQuery } : {}),
        ...(!searchQuery && selectedCategories ? { c: selectedCategories } : {}),
        ...(showPreview ? { p: 'true' } : {})
      },
      ...(focusedRecipeId ? { hash: focusedRecipeId } : {})
    },
    undefined,
    { scroll: false, shallow: true }
  )
}

export const useIndexPageState = (
  initialRecipes: TRecipe[],
  allCategories: string[]
): readonly [TIndexPageState, (newState: TIndexPageFilterState) => void] => {
  const router = useRouter()
  const { q: query, c: categories, p: preview } = router.query
  const urlParams = router.asPath.split('#')

  const searchQuery = query && typeof query === 'string' ? query : undefined

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const categorySelections = enableKeys(listToMap(allCategories, false), selectedCategories)

  useEffect(() => {
    const newSelectedCategories = Array.isArray(categories) ? categories : [categories].filter(nonNullable)
    if (arraysHaveSameContents(selectedCategories, newSelectedCategories)) {
      return
    }
    setSelectedCategories(newSelectedCategories)
  }, [categories, selectedCategories])

  const showPreview = preview === 'true'
  const focusedRecipeId = urlParams.length === 2 ? urlParams[1] : undefined

  const [recipes, setRecipes] = useState<TRecipe[] | undefined>(initialRecipes)
  const [fetchedAllRecipes, setFetchedAllRecipes] = useState(false)

  useEffect(() => {
    ; (async () => {
      if (fetchedAllRecipes) {
        setRecipes(undefined)
        return
      }
      setRecipes(await fetchRecipes({ searchQuery, selectedCategories, showPreview }))
    })()
  }, [searchQuery, selectedCategories, showPreview])

  const state = { searchQuery, selectedCategories, showPreview, focusedRecipeId, recipes, categorySelections }
  return [state, indexPageStateSetter(router)] as const
}
