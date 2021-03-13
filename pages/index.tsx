import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import recipesMock from '__mocks__/recipes'
import { TRecipe } from 'types/recipe.type'
import LiesburyRecipesService from 'services/LiesburyRecipesService'
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
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </GridLayout>
    </HorizontalCenterLayout>
  </ColumnLayout>
)

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async () => {
  const recipes: TRecipe[] = await LiesburyRecipesService.getData()
  return {
    props: {
      recipes
    },
    revalidate: 60
  }
}

export default IndexPage
