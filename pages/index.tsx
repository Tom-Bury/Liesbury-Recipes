import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'types/recipe.type'
import { getAllRecipes } from 'utils/recipesData.utils'
import LinkWrap from '~/components/LinkWrap'
import PageTitle from '~/components/PageTitle'
import RecipeCard from '~/components/RecipeCard'
import SearchBar from '~/components/SearchBar'

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
    <HorizontalCenterLayout className="mt-4 md:mt-8 mb-8 md:mb-12">
      <Image
        src="/images/liesbury-recipes-colored.svg"
        alt="Liesbury's receptenlijst"
        width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
        height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
      />
      <PageTitle className="mt-4 sm:mt-8">{PAGE_TITLE}</PageTitle>
    </HorizontalCenterLayout>
    <HorizontalCenterLayout>
      <SearchBar />
    </HorizontalCenterLayout>
    <HorizontalCenterLayout className="p-4">
      <GridLayout>
        {recipes.map((recipe: TRecipe) => (
          <LinkWrap key={recipe.id} href={`/recipe/${recipe.id}`}>
            <RecipeCard title={recipe.title} imgPath={recipe.imgPath} />
          </LinkWrap>
        ))}
      </GridLayout>
    </HorizontalCenterLayout>
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
