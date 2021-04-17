import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import remark from 'remark'
import html from 'remark-html'
import { HorizontalCenterLayout } from 'layouts'
import LinkCard from '~/components/LinkCard/LinkCard'
import { getAllRecipes, getRecipeInstructionsMarkdown } from '~/utils/recipesData.utils'
import MarkdownSnippet from '~/components/MarkdownSnippet/MarkdownSnippet'
import Loading from '~/components/Loading'

type TProps = {
  recipe: TRecipe | undefined
  instructions: string | null
}

const RecipePage: NextPage<TProps> = ({ recipe, instructions }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <Loading />
        <h3 className="text-dark">Laden...</h3>
      </HorizontalCenterLayout>
    )
  }
  if (!recipe) {
    return (
      <HorizontalCenterLayout className="h-screen justify-center">
        <h3 className="text-dark">Recept niet gevonden 😥</h3>
      </HorizontalCenterLayout>
    )
  }

  const style = {
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
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0" style={style} />
      <div className="rooftop flex flex-1 z-10 mt-72 lg:mb-16 pt-8 bg-lightest items-center">
        <div className="flex flex-col flex-1 max-w-5xl pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <h2 className="text-darkest text-center px-2">{recipe.title}</h2>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          <div className="grid grid-cols-1 gap-y-8 pt-8">
            {recipeUrl?.hostname && (
              <section className="w-full flex flex-col items-start px-8">
                <h3 className="text-dark">Origineel recept </h3>
                <LinkCard url={recipeUrl} title={new URL(recipe.url).hostname} className="mx-8 my-4" />
              </section>
            )}

            {recipe.ingredients && (
              <section className="w-full flex flex-col items-start px-8">
                <h3 className="text-dark">Ingrediënten</h3>
                <ul className="list-disc list-inside px-4 my-4 text-dark">
                  {recipe.ingredients.split(',').map(i => (
                    <li key={i} className="text-lg">
                      {i.trim()}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {instructions && (
              <section className="w-full flex flex-col items-start bg-light">
                <MarkdownSnippet instructionsHtml={instructions} className="p-8 py-16 text-darkest" />
              </section>
            )}
          </div>
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
    }
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
