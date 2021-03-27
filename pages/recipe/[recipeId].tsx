import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import Card from '~/components/Card/Card'
import ElementTitle from '~/components/ElementTitle'
import SectionTitle from '~/components/SectionTitle'
import { getAllRecipes } from '~/utils/recipesData.utils'

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
    <div className="flex flex-1 flex-col items-center">
      <div className="max-w-6xl w-full flex flex-1">
        <div className="max-w-6xl w-full h-80 fixed top-0 z-0" style={style} />
        <div className="test flex flex-1 flex-col z-10 mt-72 p-8 pt-8 bg-lightest">
          <div className="sticky top-0 pt-6 bg-lightest">
            <SectionTitle>{recipe.title}</SectionTitle>
            <hr className="border-t-4 border-primary" />
          </div>
          <div className="flex flex-1 flex-col items-start pt-8">
            <ElementTitle>Original recipe</ElementTitle>
            <Card hoverable className="p-8">To recipe</Card>
            {indices.map(i => (
              <div key={i} className="h-20 w-20 bg-dark p-8 m-8">
                {i}
              </div>
            ))}
            <ElementTitle>Ingredients</ElementTitle>
            <ElementTitle>Recipe</ElementTitle>
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
