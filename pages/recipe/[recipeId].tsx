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

const SlidingRecipeImage: React.FC<{ url?: string }> = ({ url }) => {
  const [offset, setOffset] = useState(0)

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y <= 200) {
        setOffset(currPos.y)
      }
    },
    [],
    undefined,
    true,
    20
  )

  const recipeImgBaseStyle = {
    background: `linear-gradient(to top, #000000 0%, #00000000 50%), url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    opacity: 1 - Math.min(offset / 200, 1)
  }

  const darkenedStyle = {
    opacity: 1,
    filter: 'brightness(0.75)'
  }

  const offsetStyle = {
    top: -offset / 3
  }

  const blurredStyle = {
    opacity: 1,
    filter: 'blur(10px) brightness(0.75)'
  }

  const scaledStyle = {
    transform: `scale(${1.2 - 0.0005 * Math.min(offset, 200)})`
  }

  return (
    <span className="max-w-5xl w-full h-80 fixed top-0 z-0 overflow-hidden">
      <div className="absolute top-0 w-full bottom-0 hidden lg:flex" style={{ ...recipeImgBaseStyle, ...darkenedStyle, ...offsetStyle }} />
      <div className="absolute top-0 w-full bottom-0 hidden lg:flex" style={{ ...recipeImgBaseStyle, ...offsetStyle }} />
      <div className="absolute top-0 w-full bottom-0 lg:hidden" style={{ ...recipeImgBaseStyle, ...blurredStyle, ...scaledStyle }} />
      <div className="absolute top-0 w-full bottom-0 lg:hidden" style={{ ...recipeImgBaseStyle, ...scaledStyle }} />
    </span>
  )
}

const RecipePage: NextPage<TProps> = ({ recipe }) => {
  const router = useRouter()
  const { isFallback } = router
  const isLoggedIn = useLoginStatus()
  const fadeInStyle = useFadeInStyle()

  if (!recipe) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <h3 className="text-dark">Recept niet gevonden 😥</h3>
      </HorizontalCenterLayout>
    )
  }

  return (
    <div className={`flex flex-1 justify-center ${fadeInStyle}`}>
      <SlidingRecipeImage url={recipe.imgUrl} />
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
