/* eslint-disable react/no-array-index-key */
import { TRecipeWithoutData } from 'backend/types/recipes.types'
import { GridLayout } from 'layouts'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import LinkWrap from './LinkWrap'
import { RecipeCard } from './RecipeCard'

type TProps = {
  recipes?: TRecipeWithoutData[]
  onRecipeClick?: (recipeId: string) => void
  scrollToRecipeWithId?: string
  className?: string
}

type TRecipeRefs = {
  [recipeId: string]: HTMLAnchorElement | null
}

const useAnimatedRecipes = (
  recipes: TRecipeWithoutData[] | undefined
): {
  animationClass: string
  animationDelay: number
  currRecipes?: TRecipeWithoutData[]
} => {
  const [currRecipes, setCurrRecipes] = useState(recipes)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (recipes === undefined) {
      setFadeOut(true)
      setFadeIn(false)
    }
  }, [recipes, currRecipes])

  useEffect(() => {
    if (recipes !== undefined && recipes !== currRecipes) {
      setCurrRecipes(recipes)

      if (fadeOut) {
        setFadeOut(false)
        setFadeIn(true)
      }
    }
  }, [recipes, currRecipes, fadeOut])

  if (fadeOut) {
    return { animationClass: 'animate-fade-out', currRecipes, animationDelay: 0 }
  }

  if (fadeIn) {
    return { animationClass: 'animate-fade-in-left', currRecipes, animationDelay: 0.13 }
  }

  return { animationClass: '', currRecipes, animationDelay: 0 }
}

const RecipeList: React.FC<TProps> = ({ recipes, scrollToRecipeWithId, className, onRecipeClick }) => {
  const { animationClass, animationDelay, currRecipes } = useAnimatedRecipes(recipes)
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
        currRecipes.map((recipe: TRecipeWithoutData, i) => (
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
