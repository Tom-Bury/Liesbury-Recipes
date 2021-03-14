import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'types/recipe.type'
import { getAllRecipes } from 'utils/recipesData.utils'
import LinkWrap from '~/components/LinkWrap'
import PageTitle from '~/components/PageTitle'
import RecipeCard from '~/components/RecipeCard'
import SearchBar from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}
const FRONT_IMAGE_SCALE = 1.25
const PAGE_TITLE = `Liesbury's receptenlijst`

type TProps = {
  recipes: TRecipe[]
}

const IndexPage: NextPage<TProps> = ({ recipes }) => (
  <ColumnLayout>
    <HorizontalCenterLayout className="mt-2">
      <Image
        src="/images/liesbury-recipes-colored.svg"
        alt="Liesbury's receptenlijst"
        width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
        height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
      />
      <PageTitle className="mt-4">{PAGE_TITLE}</PageTitle>
    </HorizontalCenterLayout>
    <HorizontalCenterLayout className="my-8">
      <SearchBar className="max-w-xl" />
    </HorizontalCenterLayout>
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
