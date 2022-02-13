import { getAllRecipeIds, getRecipeById } from 'backend/recipes'
import { TRecipe } from 'backend/types/recipes.types'
import { HorizontalCenterLayout } from 'layouts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { ParsedUrlQuery } from 'querystring'
import * as React from 'react'
import Image from 'next/image'
import useLoginStatus from 'hooks/useLoginStatus'
// import remark from 'remark'
// import html from 'remark-html'
import RecipeData from '~/components/RecipeData'
import RecipePlaceholder from '~/components/RecipePlaceholder'
import CircularButton from '~/components/atoms/CircularButton/CircularButton'
import BackButton from '~/components/atoms/BackButton/BackButton'

type TProps = {
  recipe?: TRecipe
}

const RecipePage: NextPage<TProps> = ({ recipe }) => {
  const router = useRouter()
  const { isFallback } = router
  const isLoggedIn = useLoginStatus()

  if (!recipe) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <h3 className="text-dark">Recept niet gevonden 😥</h3>
      </HorizontalCenterLayout>
    )
  }

  const recipeImgStyle = {
    background: `url(${recipe.imgUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0" style={recipeImgStyle} />
      <div className="rooftop flex flex-1 z-10 mt-72 mb-24 pt-8 bg-lightest items-center">
        <div className="flex flex-col flex-1 max-w-5xl pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <h2 className="text-darkest text-center px-2">{isFallback ? '...' : recipe.title}</h2>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          {isFallback ? <RecipePlaceholder /> : <RecipeData recipe={recipe} />}
        </div>
      </div>
      <span className="fab-container justify-between">
        <BackButton />
        {isLoggedIn && (
          <CircularButton
            className="ml-auto my-4 mr-4 lg:mr-0 z-50"
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
          </CircularButton>
        )}
      </span>
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
    // let instructions
    // if (recipe && recipe.steps !== '') {
    // const recipeInstructionsData = await getRecipeInstructionsMarkdown(recipe.steps)
    // const processedInstructions = recipeInstructionsData ? await remark().use(html).process(recipeInstructionsData) : null
    // instructions = processedInstructions ? processedInstructions.toString() : null
    // }

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
