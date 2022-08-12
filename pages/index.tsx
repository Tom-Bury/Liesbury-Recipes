import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'backend/types/recipes.types'
import { getLastNRecipes } from 'backend/recipes'
import searchRecipes from 'api/searchRecipes'
import useFadeInStyle from 'hooks/useFadeInStyle'
import SearchBar from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import Loading from '~/components/Loading'
import { ERecipeBackNavigationLocalStorageKeys } from '~/utils/navigation.utils'

type TProps = {
  recipes: TRecipe[]
}

const useRecipeIdToScrollTo = (recipes: TRecipe[]): string | undefined => {
  const [recipeIdToScrollTo, setRecipeIdToScrollTo] = React.useState<string | undefined>()

  React.useEffect(() => {
    if (recipes.length > 0 && localStorage.getItem(ERecipeBackNavigationLocalStorageKeys.HOME_SHOULD_NAVIGATE)) {
      const recipeId = localStorage.getItem(ERecipeBackNavigationLocalStorageKeys.RECIPE_ID_TO_NAVIGATE_TO)

      localStorage.removeItem(ERecipeBackNavigationLocalStorageKeys.HOME_SHOULD_NAVIGATE)
      localStorage.removeItem(ERecipeBackNavigationLocalStorageKeys.RECIPE_ID_TO_NAVIGATE_TO)

      if (recipeId && recipeId !== '') {
        setRecipeIdToScrollTo(recipeId)
      }
    }
  }, [recipes])

  return recipeIdToScrollTo
}

const IndexPage: NextPage<TProps> = ({ recipes }) => {
  const [currRecipes, setCurrRecipes] = React.useState(recipes)
  const [isLoading, setIsLoading] = React.useState(false)
  const recipeIdToScrollTo = useRecipeIdToScrollTo(currRecipes)
  const fadeInStyle = useFadeInStyle()

  const onSubmitSearch = async (query: string) => {
    setIsLoading(true)
    const foundRecipes = await searchRecipes(query)
    setCurrRecipes(foundRecipes)
    setIsLoading(false)
  }

  return (
    <ColumnLayout className={`pb-8 ${fadeInStyle}`}>
      <Banner />
      <HorizontalCenterLayout className="my-8 mx-4">
        <div className="max-w-xl w-full">
          <SearchBar onSearch={onSubmitSearch} />
        </div>
      </HorizontalCenterLayout>
      <hr className="mb-8 border-t-4 border-primary lg:mx-8" />
      {isLoading && (
        <HorizontalCenterLayout>
          <Loading className="py-8" />
        </HorizontalCenterLayout>
      )}
      {!isLoading && currRecipes.length > 0 && <RecipeList recipes={currRecipes} scrollToRecipeWithId={recipeIdToScrollTo} />}
      {!isLoading && currRecipes.length === 0 && (
        <HorizontalCenterLayout className="h-screen">
          <h2 className="text-darkest mb-8">Geen recepten gevonden 😭</h2>
          <h3 className="text-primary">Misschien kan je iets anders proberen zoeken?</h3>
        </HorizontalCenterLayout>
      )}
    </ColumnLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await getLastNRecipes(100)
  return {
    props: {
      recipes
    }
  }
}

export default IndexPage
