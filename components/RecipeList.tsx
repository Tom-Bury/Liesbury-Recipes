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

const useAnimatedRecipes = (
  recipes: TRecipe[] | undefined
): {
  animationClass: string
  animationDelay: number
  currRecipes?: TRecipe[]
} => {
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeOutDone, setFadeOutDone] = useState(false)
  const [currRecipes, setCurrRecipes] = useState(recipes)
  const [skipFadeIn, setSkipFadeIn] = useState(recipes && recipes.length > 0)

  useEffect(() => {
    if (recipes !== currRecipes) {
      setSkipFadeIn(false)
      setFadeOut(true)

      setTimeout(() => {
        setFadeOut(false)
        setFadeOutDone(true)
      }, 300)
    }
  }, [recipes, currRecipes])

  useEffect(() => {
    if (fadeOutDone) {
      setCurrRecipes(recipes)
      setFadeOutDone(false)
    }
  }, [fadeOutDone, recipes])

  useEffect(() => {
    if (currRecipes === undefined && recipes !== undefined) {
      setSkipFadeIn(true)
    }
  }, [currRecipes, recipes])

  if (skipFadeIn) {
    return { animationClass: '', currRecipes, animationDelay: 0 }
  }

  return { animationClass: fadeOut ? 'animate-fade-out' : 'animate-fade-in-left', currRecipes, animationDelay: fadeOut ? 0 : 0.13 }
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
      {currRecipes === undefined &&
        Array.from(Array(10)).map((_, i) => {
          return (
            <div className={animationClass} style={{ animationDelay: `${Math.sqrt(i + 1) * animationDelay}s` }}>
              <PlaceholderRecipeCard key={`placeholder_${i}`} />
            </div>
          )
        })}
    </GridLayout>
  )
}

export default RecipeList
