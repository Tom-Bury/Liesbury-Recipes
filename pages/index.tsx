import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'backend/types/recipes.types'
import { getLastNRecipes } from 'backend/recipes'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useIndexPageCurrentRecipe } from 'hooks/useIndexPageCurrentRecipe'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { useVersion } from 'hooks/useVersion.hook'
import { useSelectableItems } from 'hooks/useSelectableItems.hook'
import SearchBar, { ISearchBar } from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import { PillButton } from '~/components/atoms/PillButton/PillButton.component'
import { VersionDisclaimerFooter } from '~/components/VersionDisclaimerFooter'

type TProps = {
  recipes: TRecipe[]
  categories: { [category: string]: boolean }
}

const IndexPage: NextPage<TProps> = ({ recipes, categories }) => {
  useVersion()
  const router = useRouter()
  const searchRef = useRef<ISearchBar>(null)
  const [currRecipes, setCurrRecipes] = useState(recipes)
  const [isLoading, setIsLoading] = useState(false)
  const { currentRecipeId, setRecipeIdToNavigateBackTo, resetSavedRecipeToNavigateBackTo } = useIndexPageCurrentRecipe()
  const { items: categorySelections, toggleItem: toggleCategory, disableAll: toggleAllCategoriesOff } = useSelectableItems(categories)

  const fadeInStyle = useFadeInStyle()
  const widthLimitClasses = 'w-full max-w-screen-md xl:max-w-screen-xl'

  const onSubmitSearch = async (query: string) => {
    setIsLoading(true)
    toggleAllCategoriesOff()
    const foundRecipes = await RecipesApi.search(query)
    setCurrRecipes(foundRecipes)
    setIsLoading(false)
  }

  const onBannerClick = useCallback(() => {
    resetSavedRecipeToNavigateBackTo()
    router.push('add-recipe')
  }, [resetSavedRecipeToNavigateBackTo, router])

  useEffect(() => {
    ;(async () => {
      const selectedCategories: string[] = []
      Object.entries(categorySelections).forEach(([category, enabled]) => {
        if (enabled) {
          selectedCategories.push(category)
        }
      })
      searchRef.current?.clearSearchInput()
      if (selectedCategories.length > 0) {
        setIsLoading(true)
        const categoryRecipes = await RecipesApi.getRecipesForCategories(selectedCategories)
        setIsLoading(false)
        setCurrRecipes(categoryRecipes)
      } else {
        setIsLoading(true)
        setTimeout(() => {
          setCurrRecipes(recipes)
          setIsLoading(false)
        }, 100)
      }
    })()
  }, [categorySelections, recipes])

  return (
    <div className={`${fadeInStyle} flex flex-col min-h-screen`}>
      <div className="mx-4 flex-1">
        <Banner onClick={onBannerClick} />
        <HorizontalCenterLayout className="my-8 md:mx-4">
          <div className="max-w-xl w-full">
            <SearchBar ref={searchRef} onSearch={onSubmitSearch} placeholder={`Zoeken in ${recipes.length} recepten...`} />
          </div>
          {Object.keys(categorySelections).length > 0 && (
            <div className={`${widthLimitClasses} flex flex-row justify-center flex-wrap mt-4`}>
              {Object.entries(categorySelections).map(([category, enabled]) => {
                return (
                  <PillButton className="mr-2 mt-2" toggleValue={enabled} capitalize onClick={() => toggleCategory(category)}>
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
                scrollToRecipeWithId={currentRecipeId}
                onRecipeClick={setRecipeIdToNavigateBackTo}
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
  console.log(categories)
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
