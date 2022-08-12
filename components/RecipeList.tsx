import { TRecipe } from 'backend/types/recipes.types'
import { HorizontalCenterLayout, GridLayout } from 'layouts'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { ERecipeBackNavigationLocalStorageKeys } from '~/utils/navigation.utils'
import LinkWrap from './LinkWrap'
import RecipeCard from './RecipeCard'

type TProps = {
  recipes: TRecipe[]
  scrollToRecipeWithId?: string
  className?: string
}

type TRecipeRefs = {
  [recipeId: string]: HTMLAnchorElement | null
}

function onRecipeClick(recipeId: string): void {
  localStorage.setItem(ERecipeBackNavigationLocalStorageKeys.RECIPE_ID_TO_NAVIGATE_TO, recipeId)
}

const RecipeList: React.FC<TProps> = ({ recipes, scrollToRecipeWithId, className }) => {
  const recipeRefs = useRef<TRecipeRefs>({})

  useEffect(() => {
    if (scrollToRecipeWithId) {
      const recipeRef = recipeRefs.current[scrollToRecipeWithId]
      if (recipeRef) {
        recipeRef.scrollIntoView()
      }
    }
  }, [scrollToRecipeWithId])

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
            onClick={() => onRecipeClick(recipe.id)}
          >
            <RecipeCard title={recipe.title} imgPath={recipe.imgUrl} blurHash={recipe.blurHash} preloadImage={i <= 9} />
          </LinkWrap>
        ))}
      </GridLayout>
    </HorizontalCenterLayout>
  )
}

export default RecipeList
