import { TRecipe } from 'backend/types/recipes.types'
import { HorizontalCenterLayout } from 'layouts'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn.hook'
import { RecipesApi } from 'api/recipes/Recipes.api'
import RecipeData from '~/components/RecipeData/RecipeData'
import RecipePlaceholder from '~/components/RecipePlaceholder'
import FloatingActionButton from '~/components/atoms/FloatingActionButton/FloatingActionButton.component'
import FloatingWrap from '~/components/atoms/FloatingActionButton/FloatingWrap.component'

type TProps = {
  recipe?: TRecipe
}

const SlidingRecipeImage: React.FC<{ url?: string; blurHash?: string }> = ({ url, blurHash }) => {
  const [offset, setOffset] = useState(0)
  const [blurHashOpacity, setBlurHashOpacity] = useState(1)

  React.useEffect(() => {
    if (blurHashOpacity < 1 && blurHashOpacity > 0) {
      setBlurHashOpacity(prev => prev - 0.1)
    }
    if (blurHashOpacity <= 0) {
      setBlurHashOpacity(0)
    }
  }, [blurHashOpacity])

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

  const blurHashedRecipeImgBaseStyle = {
    background: `url(${blurHash})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: blurHashOpacity - Math.min(offset / 200, 1),
    filter: 'blur(10px)'
  }

  const otherOpacity = blurHashOpacity === 0 ? 1 : 1 - blurHashOpacity

  const recipeImgBaseStyle = {
    background: `url(${url})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: otherOpacity - Math.min(offset / 200, 1)
  }

  const darkenedStyle = {
    opacity: otherOpacity,
    filter: 'brightness(0.75)'
  }

  const offsetStyle = {
    top: -offset / 3
  }

  const blurredStyle = {
    background: `url(${blurHash || url})`,
    opacity: otherOpacity,
    filter: 'blur(10px) brightness(0.75)'
  }

  const scaledStyle = {
    transform: `scale(${1.2 - 0.0005 * Math.min(offset, 200)})`
  }

  return (
    <span className="max-w-5xl w-full h-80 fixed top-0 z-0 overflow-hidden">
      {url && <Image className="hidden" width="0" height="0" src={url} onLoadingComplete={() => setBlurHashOpacity(0.1)} />}
      <div className="absolute top-0 w-full bottom-0 hidden lg:flex" style={{ ...recipeImgBaseStyle, ...darkenedStyle, ...offsetStyle }} />
      <div className="absolute top-0 w-full bottom-0 hidden lg:flex" style={{ ...recipeImgBaseStyle, ...offsetStyle }} />
      <div className="absolute top-0 w-full bottom-0 hidden lg:flex" style={{ ...blurHashedRecipeImgBaseStyle, ...offsetStyle }} />
      <div className="absolute top-0 w-full bottom-0 lg:hidden" style={{ ...recipeImgBaseStyle, ...blurredStyle, ...scaledStyle }} />
      <div className="absolute top-0 w-full bottom-0 lg:hidden" style={{ ...recipeImgBaseStyle, ...scaledStyle }} />
      <div className="absolute top-0 w-full bottom-0 lg:hidden" style={{ ...blurHashedRecipeImgBaseStyle, ...scaledStyle }} />
    </span>
  )
}

const Triangle = () => (
  <svg id="recipe-triangle" viewBox="0 0 100 25" height="32">
    <polygon points="50,0 100,25 0,25" fill="#EDF6F9" />
  </svg>
)

const RecipePage: NextPage<TProps> = ({ recipe }) => {
  const router = useRouter()
  const { isFallback } = router
  const isLoggedIn = useIsLoggedIn()
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
      <SlidingRecipeImage url={recipe.imgUrl} blurHash={recipe.blurHash} />
      <div className="flex flex-1 z-20 mt-72 mb-24 bg-lightest justify-center items-center relative">
        <Triangle />
        <div className="topShadow w-full flex flex-col flex-1 max-w-5xl pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <h2 className="text-darkest text-center px-2">{isFallback ? '...' : recipe.title}</h2>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          {isFallback ? <RecipePlaceholder /> : <RecipeData recipe={recipe} />}
        </div>
      </div>
      {isLoggedIn && (
        <FloatingWrap className="flex flex-row items-center" placement="right">
          <FloatingActionButton
            error
            size="s"
            className="mr-4"
            onPress={async () => {
              // eslint-disable-next-line no-alert, no-restricted-globals
              const confirmed = confirm(`Zeker dat je ${recipe.title} wilt verwijderen?`)
              if (confirmed) {
                await RecipesApi.delete(recipe.id)
                router.back()
              }
            }}
          >
            <Image src="/icons/delete.svg" alt="Delete icon" width={24} height={24} />
          </FloatingActionButton>
          <FloatingActionButton
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
        </FloatingWrap>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<TProps, { recipeId: string }> = async context => {
  const { params } = context
  if (params?.recipeId) {
    const recipe = await RecipesApi.getById(params.recipeId)
    return {
      props: {
        recipe
      }
    }
  }
  return {
    notFound: true
  }
}

export default RecipePage
