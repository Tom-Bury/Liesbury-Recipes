import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'

import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'types/recipe.type'
import { getAllRecipes } from 'utils/recipesData.utils'
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

  const searchRecipes = async (query: string) => {
    setIsLoading(true)
    const res = await fetch(
      `/api/SearchRecipe?${new URLSearchParams({
        q: query
      })}`
    )
    if (res.status === 200) {
      const responseBody = await res.json()
      const newRecipes: TRecipe[] = responseBody.results
      if (newRecipes.length === 0) {
        // TODO: display no recipes found string
      }
      setCurrRecipes(newRecipes)
      setIsLoading(false)
    } else {
      // TODO: no recipes found
      setCurrRecipes([])
      setIsLoading(false)
    }
  }

  return (
    <ColumnLayout className="pb-8">
      <Banner />
      <HorizontalCenterLayout className="my-8 mx-4">
        <div className="max-w-xl w-full">
          <SearchBar onSearch={searchRecipes} />
        </div>
      </HorizontalCenterLayout>
      <hr className="mb-8 border-2 border-primary lg:mx-8" />
      {isLoading ? (
        <HorizontalCenterLayout>
          <Loading />
        </HorizontalCenterLayout>
      ) : (
        <RecipeList recipes={currRecipes} />
      )}
    </ColumnLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes: TRecipe[] = await getAllRecipes()
  return {
    props: {
      recipes
    },
    revalidate: 60 // in seconds
  }
}

export default IndexPage
