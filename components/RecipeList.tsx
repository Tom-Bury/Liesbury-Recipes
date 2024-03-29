/* eslint-disable react/no-array-index-key */
import { TRecipe } from 'backend/types/recipes.types'
import { GridLayout } from 'layouts'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import LinkWrap from './LinkWrap'
import { PlaceholderRecipeCard, RecipeCard } from './RecipeCard'

type TProps = {
  recipes?: TRecipe[]
  onRecipeClick?: (recipeId: string) => void
  scrollToRecipeWithId?: string
  className?: string
}

type TRecipeRefs = {
  [recipeId: string]: HTMLAnchorElement | null
}

const RecipeList: React.FC<TProps> = ({ recipes, scrollToRecipeWithId, className, onRecipeClick }) => {
  const recipeRefs = useRef<TRecipeRefs>({})

  const [nbRecipes, setNbRecipes] = useState(recipes ? recipes.length : 0)

  useEffect(() => {
    if (recipes) setNbRecipes(recipes.length)
  }, [recipes])

  useEffect(() => {
    if (scrollToRecipeWithId && recipes) {
      const recipeRef = recipeRefs.current[scrollToRecipeWithId]
      if (recipeRef) {
        recipeRef.scrollIntoView({
          block: 'center'
        })
      }
    }
  }, [scrollToRecipeWithId, recipes])

  return (
    <GridLayout className={className}>
      {recipes &&
        recipes.map((recipe: TRecipe, i) => (
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
      {!recipes && Array.from(Array(nbRecipes)).map((_, i) => <PlaceholderRecipeCard key={`placeholder_${i}`} />)}
    </GridLayout>
  )
}

export default RecipeList
