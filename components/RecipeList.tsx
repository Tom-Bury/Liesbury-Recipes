/* eslint-disable react/no-array-index-key */
import { TRecipe } from 'backend/types/recipes.types'
import { GridLayout } from 'layouts'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import LinkWrap from './LinkWrap'
import { RecipeCard } from './RecipeCard'

type TProps = {
  recipes?: TRecipe[]
  refreshKey: string
  skipAnimation?: boolean
  onRecipeClick?: (recipeId: string) => void
  scrollToRecipeWithId?: string
  className?: string
}

type TRecipeRefs = {
  [recipeId: string]: HTMLAnchorElement | null
}

const useAnimatedRecipes = (
  recipes: TRecipe[] | undefined,
  refreshKey: string,
  skipAnimation?: boolean
): {
  animationClass: string
  animationDelay: number
  currRecipes?: TRecipe[]
} => {
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeOutDone, setFadeOutDone] = useState(false)
  const [currRecipes, setCurrRecipes] = useState(recipes)
  const [currRefreshKey, setCurrRefreshKey] = useState(refreshKey)

  useEffect(() => {
    if (recipes !== currRecipes) {
      if (refreshKey === currRefreshKey) {
        setCurrRecipes(recipes)
        setCurrRefreshKey(refreshKey)
        return
      }

      setFadeOut(true)

      setTimeout(() => {
        setFadeOut(false)
        setFadeOutDone(true)
      }, 300)
    }
  }, [recipes, currRecipes, refreshKey, currRefreshKey])

  useEffect(() => {
    if (fadeOutDone) {
      setCurrRecipes(recipes)
      setCurrRefreshKey(refreshKey)
      setFadeOutDone(false)
    }
  }, [fadeOutDone, recipes, refreshKey])

  if (skipAnimation || typeof window === 'undefined') {
    return { animationClass: '', currRecipes, animationDelay: 0 }
  }

  return { animationClass: fadeOut ? 'animate-fade-out' : 'animate-fade-in-left', currRecipes, animationDelay: fadeOut ? 0 : 0.13 }
}

const RecipeList: React.FC<TProps> = ({ refreshKey, recipes, skipAnimation, scrollToRecipeWithId, className, onRecipeClick }) => {
  const { animationClass, animationDelay, currRecipes } = useAnimatedRecipes(recipes, refreshKey, skipAnimation)
  const recipeRefs = useRef<TRecipeRefs>({})

  useEffect(() => {
    if (scrollToRecipeWithId && currRecipes) {
      const recipeRef = recipeRefs.current[scrollToRecipeWithId]
      if (recipeRef) {
        recipeRef.scrollIntoView({
          block: 'center'
        })
      }
    }
  }, [scrollToRecipeWithId, currRecipes])

  return (
    <GridLayout className={className}>
      {currRecipes &&
        currRecipes.map((recipe: TRecipe, i) => (
          <LinkWrap
            key={recipe.id}
            ref={el => {
              recipeRefs.current[recipe.id] = el
            }}
            href={`/recipe/${recipe.id}`}
            className="rmMobileClickBox w-full"
            onClick={onRecipeClick ? () => onRecipeClick(recipe.id) : undefined}
          >
            <div className={animationClass} style={{ animationDelay: `${Math.sqrt(i + 1) * animationDelay}s` }}>
              <RecipeCard title={recipe.title} imgPath={recipe.imgUrl} blurHash={recipe.blurHash} preloadImage={i <= 9} />
            </div>
          </LinkWrap>
        ))}
    </GridLayout>
  )
}

export default RecipeList
