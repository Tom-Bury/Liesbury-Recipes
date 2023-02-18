import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'backend/types/recipes.types'
import { getLastNRecipes } from 'backend/recipes'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useCallback, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { useVersion } from 'hooks/useVersion.hook'
import { TQueryParam } from 'types/util.types'
import { SearchBar } from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import { PillButton } from '~/components/atoms/PillButton/PillButton.component'
import { VersionDisclaimerFooter } from '~/components/VersionDisclaimerFooter'
import { enableKeys } from '~/utils/general.utils'
import { nonNullable } from '~/utils/type.utils'

type TProps = {
  recipes: TRecipe[]
  categories: { [category: string]: boolean }
}

const replaceHome = (router: NextRouter, searchQuery: TQueryParam, selectedCategories: TQueryParam, recipeId?: string) => {
  router.replace(
    {
      query: {
        ...(searchQuery ? { q: searchQuery } : {}),
        ...(!searchQuery && selectedCategories ? { sq: selectedCategories } : {})
      },
      ...(recipeId ? { hash: recipeId } : {})
    },
    undefined,
    { scroll: false, shallow: true }
  )
}

const useSearchQuery = (
  loadRecipes: (recipePromise: Promise<TRecipe[]>) => Promise<void>
): [string | undefined, (newQuery: string) => void] => {
  const router = useRouter()
  const { q } = router.query
  const [searchQuery, setSearchQuery] = useState(typeof q === 'string' ? q : undefined)

  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q)
      loadRecipes(RecipesApi.search(q))
    } else {
      setSearchQuery(undefined)
    }
  }, [loadRecipes, q])

  return [searchQuery, setSearchQuery]
}

const useCategories = (
  categories: { [category: string]: boolean },
  loadRecipes: (recipePromise: Promise<TRecipe[]>) => Promise<void>
): [{ [catgory: string]: boolean }, (category: string) => void] => {
  const router = useRouter()
  const { sq } = router.query
  const selectedCategories = Array.isArray(sq) ? sq : [sq].filter(nonNullable)
  const categorySelections = enableKeys(categories, selectedCategories)

  useEffect(() => {
    const selectedCategoriesUseEffect = Array.isArray(sq) ? sq : [sq].filter(nonNullable)
    if (selectedCategoriesUseEffect.length > 0) {
      loadRecipes(RecipesApi.getRecipesForCategories(selectedCategoriesUseEffect))
    }
  }, [loadRecipes, sq])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      replaceHome(
        router,
        undefined,
        selectedCategories.filter(c => c !== category)
      )
    } else {
      replaceHome(router, undefined, [...selectedCategories, category])
    }
  }

  return [categorySelections, toggleCategory]
}

const useResetToDefaultRecipesOnEmptyQueries = (
  defaultRecipes: TRecipe[],
  loadRecipes: (recipePromise: Promise<TRecipe[]>) => Promise<void>
) => {
  const router = useRouter()
  const { q, sq } = router.query

  useEffect(() => {
    if (q === undefined && sq === undefined) {
      loadRecipes(new Promise(resolve => setTimeout(() => resolve(defaultRecipes), 150)))
    }
  }, [loadRecipes, q, defaultRecipes, sq])
}

const useRecipeToScrollTo = (): [string | undefined, (recipeId: string) => void] => {
  const router = useRouter()
  const { q, sq } = router.query
  const urlParams = router.asPath.split('#')

  const setRecipeToScrollTo = (recipeId: string) => {
    replaceHome(router, q, sq, recipeId)
  }

  if (urlParams.length === 2) {
    return [urlParams[1], setRecipeToScrollTo]
  }
  return [undefined, setRecipeToScrollTo]
}

const IndexPage: NextPage<TProps> = ({ recipes, categories }) => {
  useVersion()
  const fadeInStyle = useFadeInStyle()
  const widthLimitClasses = 'w-full max-w-screen-md xl:max-w-screen-xl'
  const router = useRouter()

  const [currRecipes, setCurrRecipes] = useState(recipes)
  const [isLoading, setIsLoading] = useState(false)

  const loadRecipes = useCallback(async (recipePromise: Promise<TRecipe[]>) => {
    setIsLoading(true)
    setCurrRecipes(await recipePromise)
    setIsLoading(false)
  }, [])

  const [searchQuery, setSearchQuery] = useSearchQuery(loadRecipes)
  const [categorySelections, onCategoryToggle] = useCategories(categories, loadRecipes)
  useResetToDefaultRecipesOnEmptyQueries(recipes, loadRecipes)

  const onSubmitSearch = (query: string) => {
    replaceHome(router, query, [])
  }

  const [recipeIdToScrollTo, setRecipeToScrollTo] = useRecipeToScrollTo()

  return (
    <div className={`${fadeInStyle} flex flex-col min-h-screen`}>
      <div className="mx-4 flex-1">
        <Banner onClick={() => router.push('add-recipe')} />
        <HorizontalCenterLayout className="my-8 md:mx-4">
          <div className="max-w-xl w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={onSubmitSearch}
              placeholder={`Zoeken in ${recipes.length} recepten...`}
            />
          </div>
          {Object.keys(categorySelections).length > 0 && (
            <div className={`${widthLimitClasses} flex flex-row justify-center flex-wrap mt-4`}>
              {Object.entries(categorySelections).map(([category, enabled]) => {
                return (
                  <PillButton className="mr-2 mt-2" toggleValue={enabled} capitalize onClick={() => onCategoryToggle(category)}>
                    {category}
                  </PillButton>
                )
              })}
            </div>
          )}
        </HorizontalCenterLayout>
        <hr className="mb-8 border-t-4 border-primary" />
        <HorizontalCenterLayout className="md:mx-4">
          <div className={widthLimitClasses}>
            {currRecipes.length > 0 && (
              <RecipeList
                recipes={isLoading ? undefined : currRecipes}
                scrollToRecipeWithId={recipeIdToScrollTo}
                onRecipeClick={setRecipeToScrollTo}
              />
            )}
            {!isLoading && currRecipes.length === 0 && (
              <HorizontalCenterLayout>
                <h2 className="text-darkest my-8">Geen recepten gevonden 😭</h2>
                <h3 className="text-primary">Misschien kan je iets anders proberen zoeken?</h3>
              </HorizontalCenterLayout>
            )}
          </div>
        </HorizontalCenterLayout>
      </div>
      <VersionDisclaimerFooter />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getLastNRecipes(100)
  const categories = new Set(await RecipesApi.getCategoryCounts())
  const categorySelections: { [key: string]: boolean } = {}
  categories.forEach(category => {
    categorySelections[category.categoryId] = false
  })
  return {
    props: {
      recipes,
      categories: categorySelections
    },
    revalidate: 60
  }
}

export default IndexPage
