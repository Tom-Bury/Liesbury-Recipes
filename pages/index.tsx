import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'backend/types/recipes.types'
import { getLastNRecipes } from 'backend/recipes'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useIndexPageCurrentRecipe } from 'hooks/useIndexPageCurrentRecipe'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import SearchBar from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import Loading from '~/components/Loading'

type TProps = {
  recipes: TRecipe[]
}

const IndexPage: NextPage<TProps> = ({ recipes }) => {
  const router = useRouter()
  const [currRecipes, setCurrRecipes] = React.useState(recipes)
  const [isLoading, setIsLoading] = React.useState(false)
  const { currentRecipeId, setRecipeIdToNavigateBackTo, resetSavedRecipeToNavigateBackTo } = useIndexPageCurrentRecipe()
  const fadeInStyle = useFadeInStyle()

  const onSubmitSearch = async (query: string) => {
    setIsLoading(true)
    const foundRecipes = await RecipesApi.search(query)
    setCurrRecipes(foundRecipes)
    setIsLoading(false)
  }

  const onBannerClick = useCallback(() => {
    resetSavedRecipeToNavigateBackTo()
    router.push('add-recipe')
  }, [])

  return (
    <ColumnLayout className={`pb-8 ${fadeInStyle}`}>
      <Banner onClick={onBannerClick} />
      <HorizontalCenterLayout className="my-8 mx-4">
        <div className="max-w-xl w-full">
          <SearchBar onSearch={onSubmitSearch} placeholder={`Zoeken in ${recipes.length} recepten...`} />
        </div>
      </HorizontalCenterLayout>
      <hr className="mb-8 border-t-4 border-primary lg:mx-8" />
      {isLoading && (
        <HorizontalCenterLayout>
          <Loading className="py-8" />
        </HorizontalCenterLayout>
      )}
      {!isLoading && currRecipes.length > 0 && (
        <RecipeList recipes={currRecipes} scrollToRecipeWithId={currentRecipeId} onRecipeClick={setRecipeIdToNavigateBackTo} />
      )}
      {!isLoading && currRecipes.length === 0 && (
        <HorizontalCenterLayout className="h-screen">
          <h2 className="text-darkest mb-8">Geen recepten gevonden 😭</h2>
          <h3 className="text-primary">Misschien kan je iets anders proberen zoeken?</h3>
        </HorizontalCenterLayout>
      )}
    </ColumnLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getLastNRecipes(100)
  return {
    props: {
      recipes
    },
    revalidate: 60
  }
}

export default IndexPage
