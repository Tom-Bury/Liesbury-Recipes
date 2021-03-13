import * as React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, GridLayout, HorizontalCenterLayout } from 'layouts'
import recipesMock from '__mocks__/recipes'
import { RecipeCard, PageTitle } from '../components'

const IndexPage: NextPage = () => (
  <ColumnLayout>
    <HorizontalCenterLayout classNames="pt-4 md:pt-8 pb-8 md:pb-12">
      <Image src="/images/food.jpg" alt="Some food" width={500} height={350} />
      <PageTitle>Liesbury's recepentlijst</PageTitle>
    </HorizontalCenterLayout>
    <HorizontalCenterLayout>
      <GridLayout>
        {recipesMock.map(recipe => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </GridLayout>
    </HorizontalCenterLayout>
  </ColumnLayout>
)

export default IndexPage
