import { ColumnLayout } from 'layouts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
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
  return (
    <ColumnLayout>
      <Link href="/">
        <a>Back</a>
      </Link>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        {recipe.title}
      </a>
    </ColumnLayout>
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
    fallback: false
  }
}

export default RecipePage
