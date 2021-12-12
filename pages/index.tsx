import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'backend/types/recipes.types'
import { getLastNRecipes } from 'backend/recipes'
import searchRecipes from 'api/searchRecipes'
import SearchBar from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import Loading from '~/components/Loading'

type TProps = {
  recipes: TRecipe[]
}

const IndexPage: NextPage<TProps> = ({ recipes }) => {
  const [currRecipes, setCurrRecipes] = React.useState(recipes)
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmitSearch = async (query: string) => {
    setIsLoading(true)
    const foundRecipes = await searchRecipes(query)
    setCurrRecipes(foundRecipes)
    setIsLoading(false)
  }

  return (
    <ColumnLayout className="pb-8">
      <Banner />
      <HorizontalCenterLayout className="my-8 mx-4">
        <div className="max-w-xl w-full">
          <SearchBar onSearch={onSubmitSearch} />
        </div>
      </HorizontalCenterLayout>
      <hr className="mb-8 border-2 border-primary lg:mx-8" />
      {isLoading && (
        <HorizontalCenterLayout>
          <Loading />
        </HorizontalCenterLayout>
      )}
      {!isLoading && currRecipes.length > 0 && <RecipeList recipes={currRecipes} />}
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
  const recipes = await getLastNRecipes(10)
  return {
    props: {
      recipes
    },
    revalidate: 60 // in seconds
  }
}

export default IndexPage
