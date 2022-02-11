import { TRecipe } from 'backend/types/recipes.types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import LinkCard from './LinkCard/LinkCard'
import MarkdownSnippet from './MarkdownSnippet/MarkdownSnippet'

type TRecipeDataProps = {
  recipe: TRecipe
}

const RecipeData: React.FC<TRecipeDataProps> = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 gap-y-8 pt-8">
      {!!recipe.instructions && (
        <section className="flex flex-col items-start bg-light m-2" style={{ 'box-shadow': '4px 4px 0 0 #83C5BE' }}>
          <h3 className="text-darkest m-4">Recept</h3>
          <MarkdownSnippet markdownContent={recipe.instructions} className="mx-6 mb-6 text-darkest" />
        </section>
      )}

      {recipe.url && (
        <section className="w-full flex flex-col items-start px-4">
          <h3 className="text-darkest mb-4">Origineel recept</h3>
          <LinkCard url={recipe.url} title={new URL(recipe.url).hostname} className="mx-2" />
        </section>
      )}

      {/* {recipe.ingredients && (
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
    )} */}
    </div>
  )
}

export default RecipeData
