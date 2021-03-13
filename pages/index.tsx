import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import recipesMock from '__mocks__/recipes'
import { TRecipe } from 'types/recipe.type'
import LiesburyRecipesService from 'services/LiesburyRecipesService'
import { RecipeCard, PageTitle } from '../components'

const IndexPage: NextPage = ({ recipes }) => (
  <ColumnLayout>
    <HorizontalCenterLayout classNames="pt-4 md:pt-8 pb-8 md:pb-12">
      <Image src="/images/liesbury-recipes-colored.svg" alt="Some food" width={700} height={400} />
      <PageTitle>Liesbury's receptenlijst</PageTitle>
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
