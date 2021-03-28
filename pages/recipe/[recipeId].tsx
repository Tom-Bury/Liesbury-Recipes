import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import ElementTitle from '~/components/ElementTitle'
import SectionTitle from '~/components/SectionTitle'
import { getAllRecipes } from '~/utils/recipesData.utils'
import LinkCard from '~/components/LinkCard/LinkCard'

type TProps = {
  recipe: TRecipe | undefined
}

const RecipePage: NextPage<TProps> = ({ recipe }) => {
  const router = useRouter()
  if (router.isFallback) {
    // TODO
    return <p>Loading...</p>
  }
  if (!recipe) {
    // TODO
    return <p>Recipe not found</p>
  }

  const style = {
    background: `url(${recipe.imgPath})`,
    'background-position': 'center',
    'background-size': 'cover'
  }

  const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-5xl w-full h-80 fixed top-0 z-0" style={style} />
      <div className="rooftop flex flex-1 z-10 mt-72 pt-8 bg-lightest items-center">
        <div className="flex flex-col flex-1 max-w-5xl p-8 lg:p-0 pt-0 mx-auto">
          <div className="sticky top-0 pt-8 bg-lightest flex flex-col flex-1 items-center z-10">
            <SectionTitle>{recipe.title}</SectionTitle>
            <hr className="border-t-4 border-primary w-full" />
          </div>
          <div className="flex flex-1 flex-col items-start pt-8">
            <ElementTitle>Original recipe</ElementTitle>
            <LinkCard url={recipe.url} title="To original recipe website" />
            <ElementTitle>Ingredients</ElementTitle>
            {indices.map(i => (
              <div key={i} className="h-20 w-20 bg-dark p-8 m-8">
                {`todo ${i}`}
              </div>
            ))}
            <ElementTitle>Recipe</ElementTitle>
            {indices.map(i => (
              <div key={i} className="h-20 w-20 bg-dark p-8 m-8">
                {`todo ${i}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRecipes = await getAllRecipes()
  return {
    props: {
      recipe: params ? allRecipes.find(r => r.id === params.recipeId) : undefined
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
