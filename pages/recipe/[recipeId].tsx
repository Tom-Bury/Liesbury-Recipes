import { getAllRecipeIds, getRecipeById } from 'backend/recipes'
import { TRecipe } from 'backend/types/recipes.types'
import { HorizontalCenterLayout } from 'layouts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { ParsedUrlQuery } from 'querystring'
import * as React from 'react'
import Image from 'next/image'
import useLoginStatus from 'hooks/useLoginStatus'
import { useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import useFadeInStyle from 'hooks/useFadeInStyle'
import RecipeData from '~/components/RecipeData/RecipeData'
import RecipePlaceholder from '~/components/RecipePlaceholder'
import FloatingActionButton from '~/components/atoms/FloatingActionButton/FloatingActionButton.component'

type TProps = {
  recipe?: TRecipe
}

const RecipePage: NextPage<TProps> = ({ recipe }) => {
  const router = useRouter()
  const { isFallback } = router
  const isLoggedIn = useLoginStatus()
  const [offset, setOffset] = useState(0)
  const fadeInStyle = useFadeInStyle()

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y <= 400) {
        setOffset(currPos.y)
      }
    },
    [],
    undefined,
    true,
    5
  )

  if (!recipe) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <h3 className="text-dark">Recept niet gevonden 😥</h3>
      </HorizontalCenterLayout>
    )
  }

  const recipeImgStyle5xl = {
    background: `linear-gradient(to top, #000000 0%, #00000000 50%), url(${recipe.imgUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: `brightness(${1 - Math.min(offset / 500, 1)})`
  }

  const recipeImgStyleSmall = {
    ...recipeImgStyle5xl,
    filter: `blur(${0.01 * offset}px) brightness(${1 - Math.min(offset / 500, 1)})`,
    transform: `scale(${1.4 - 0.001 * offset})`
  }

  return (
    <div className={`flex flex-1 justify-center ${fadeInStyle}`}>
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0 lg:hidden" style={recipeImgStyleSmall} />
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0 hidden lg:flex" style={recipeImgStyle5xl} />
      <div className="rooftop flex flex-1 z-10 mt-72 mb-24 pt-8 bg-lightest items-center">
        <div className="flex flex-col flex-1 max-w-5xl pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <h2 className="text-darkest text-center px-2">{isFallback ? '...' : recipe.title}</h2>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          {isFallback ? <RecipePlaceholder /> : <RecipeData recipe={recipe} />}
        </div>
      </div>
      {isLoggedIn && (
        <FloatingActionButton
          placement="right"
          onPress={() => {
            localStorage.setItem('recipe', JSON.stringify(recipe))
            router.push({
              pathname: '/add-recipe',
              query: {
                prefilled: true
              }
            })
          }}
        >
          <Image src="/icons/edit.svg" alt="Edit icon" width={24} height={24} />
        </FloatingActionButton>
      )}
    </div>
  )
}

interface IParams extends ParsedUrlQuery {
  recipeId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allRecipes = await getAllRecipeIds()
  const paths = allRecipes.map(recipeId => ({ params: { recipeId } }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TProps, IParams> = async ({ params }) => {
  if (params?.recipeId) {
    const recipe = await getRecipeById(params.recipeId)

    return {
      props: {
        recipe
      },
      revalidate: 60 * 5 // Regenerate the page when a new request comes in, at most each 5 minutes
    }
  }
  return {
    props: {},
    revalidate: 60 * 5 // Regenerate the page when a new request comes in, at most each 5 minutes
  }
}

export default RecipePage
