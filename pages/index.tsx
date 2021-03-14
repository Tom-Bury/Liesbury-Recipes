import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'

import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'types/recipe.type'
import { getAllRecipes } from 'utils/recipesData.utils'
import SearchBar from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'

type TProps = {
  recipes: TRecipe[]
}

const IndexPage: NextPage<TProps> = ({ recipes }) => (
  <ColumnLayout>
    <Banner />
    <HorizontalCenterLayout className="my-8">
      <SearchBar className="max-w-xl" />
    </HorizontalCenterLayout>
    <hr className="mb-8 border-2 border-primary lg:mx-8" />
    <RecipeList recipes={recipes} />
  </ColumnLayout>
)

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
