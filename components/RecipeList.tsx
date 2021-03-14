import { HorizontalCenterLayout, GridLayout } from 'layouts'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import LinkWrap from './LinkWrap'
import RecipeCard from './RecipeCard'

type TProps = {
  recipes: TRecipe[]
}

const RecipeList: React.FC<TProps> = ({ recipes }) => (
  <HorizontalCenterLayout>
    <GridLayout>
      {recipes.map((recipe: TRecipe) => (
        <LinkWrap key={recipe.id} href={`/recipe/${recipe.id}`}>
          <RecipeCard title={recipe.title} imgPath={recipe.imgPath} />
        </LinkWrap>
      ))}
    </GridLayout>
  </HorizontalCenterLayout>
)

export default RecipeList
