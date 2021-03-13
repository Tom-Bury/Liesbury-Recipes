import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import { TRecipe } from 'types/recipe.type'
import { getAllRecipes } from 'utils/recipesData.utils'
import { RecipeCard, PageTitle } from '../components'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}

const FRONT_IMAGE_SCALE = 1.75

const IndexPage: NextPage = ({ recipes }) => (
  <ColumnLayout>
    <HorizontalCenterLayout classNames="mt-4 md:mt-8 mb-8 md:mb-12">
      <Image
        src="/images/liesbury-recipes-colored.svg"
        alt="Liesbury's receptenlijst"
        width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
        height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
      />
      <PageTitle className="mt-4 sm:mt-8">Liesbury's receptenlijst</PageTitle>
    </HorizontalCenterLayout>
    <HorizontalCenterLayout>
      <GridLayout>
        {recipes.map((recipe: TRecipe) => (
          <RecipeCard key={recipe.title} title={recipe.title} imgPath={recipe.imgPath} />
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
