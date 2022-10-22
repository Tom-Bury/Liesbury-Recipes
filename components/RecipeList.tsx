import { TRecipe } from 'backend/types/recipes.types'
import { HorizontalCenterLayout, GridLayout } from 'layouts'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import LinkWrap from './LinkWrap'
import RecipeCard from './RecipeCard'

type TProps = {
  recipes: TRecipe[]
  onRecipeClick?: (recipeId: string) => void
  scrollToRecipeWithId?: string
  className?: string
}

type TRecipeRefs = {
  [recipeId: string]: HTMLAnchorElement | null
}

const RecipeList: React.FC<TProps> = ({ recipes, scrollToRecipeWithId, className, onRecipeClick }) => {
  const recipeRefs = useRef<TRecipeRefs>({})
  const [initialRecipeIdToScrollTo] = useState(scrollToRecipeWithId)

  useEffect(() => {
    if (initialRecipeIdToScrollTo) {
      const recipeRef = recipeRefs.current[initialRecipeIdToScrollTo]
      if (recipeRef) {
        recipeRef.scrollIntoView({
          block: 'center'
        })
      }
    }
  }, [initialRecipeIdToScrollTo])

  return (
    <HorizontalCenterLayout>
      <GridLayout className={className}>
        {recipes.map((recipe: TRecipe, i) => (
          <LinkWrap
            key={recipe.id}
            ref={el => {
              recipeRefs.current[recipe.id] = el
            }}
            href={`/recipe/${recipe.id}`}
            className="rmMobileClickBox w-full"
            onClick={onRecipeClick ? () => onRecipeClick(recipe.id) : undefined}
          >
            <RecipeCard title={recipe.title} imgPath={recipe.imgUrl} blurHash={recipe.blurHash} preloadImage={i <= 9} />
          </LinkWrap>
        ))}
      </GridLayout>
    </HorizontalCenterLayout>
  )
}

export default RecipeList
