import { HorizontalCenterLayout, GridLayout } from 'layouts'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import LinkWrap from './LinkWrap'
import RecipeCard from './RecipeCard'

type TProps = {
  recipes: TRecipe[]
  className?: string
}

const RecipeList: React.FC<TProps> = ({ recipes, className }) => (
  <HorizontalCenterLayout>
    <GridLayout className={className}>
      {recipes.map((recipe: TRecipe, i) => (
        <LinkWrap key={recipe.id} href={`/recipe/${recipe.id}`} className="rmMobileClickBox w-full">
          <RecipeCard title={recipe.title} imgPath={recipe.imgPath} preloadImage={i <= 9} />
        </LinkWrap>
      ))}
    </GridLayout>
  </HorizontalCenterLayout>
)

export default RecipeList
