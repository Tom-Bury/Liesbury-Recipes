import { HorizontalCenterLayout } from 'layouts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import remark from 'remark'
import html from 'remark-html'
import { TRecipe } from 'types/recipe.type'
import RecipeData from '~/components/RecipeData'
import RecipePlaceholder from '~/components/RecipePlaceholder'
import { getAllRecipes, getRecipeInstructionsMarkdown } from '~/utils/recipesData.utils'

type TProps = {
  recipe: TRecipe | undefined
  instructions: string | null
}

const RecipePage: NextPage<TProps> = ({ recipe, instructions }) => {
  const { isFallback } = useRouter()

  if (!recipe) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <h3 className="text-dark">Recept niet gevonden 😥</h3>
      </HorizontalCenterLayout>
    )
  }

  const recipeImgStyle = {
    background: `url(${recipe.imgPath})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  let recipeUrl
  try {
    recipeUrl = new URL(recipe.url)
  } catch (_) {
    // Noop
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0" style={recipeImgStyle} />
      <div className="rooftop flex flex-1 z-10 mt-72 lg:mb-16 pt-8 bg-lightest items-center">
        <div className="flex flex-col flex-1 max-w-5xl pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <h2 className="text-darkest text-center px-2">{isFallback ? '...' : recipe.title}</h2>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          {isFallback ? <RecipePlaceholder /> : <RecipeData recipe={recipe} recipeUrl={recipeUrl} instructions={instructions} />}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRecipes = await getAllRecipes()
  const recipe = params ? allRecipes.find(r => r.id === params.recipeId) : undefined
  let instructions = null
  if (recipe && recipe.steps !== '') {
    const recipeInstructionsData = await getRecipeInstructionsMarkdown(recipe.steps)
    const processedInstructions = recipeInstructionsData ? await remark().use(html).process(recipeInstructionsData) : null
    instructions = processedInstructions ? processedInstructions.toString() : null
  }

  return {
    props: {
      recipe,
      instructions
    },
    revalidate: 60 * 5 // Regenerate the page when a new request comes in, at most each 5 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allRecipes = await getAllRecipes()
  const paths = allRecipes.map(r => ({ params: { recipeId: r.id } }))
  return {
    paths,
    fallback: true
  }
}

export default RecipePage
