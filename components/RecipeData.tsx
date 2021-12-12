import { TRecipe } from 'backend/types/recipes.types'
import * as React from 'react'
import LinkCard from './LinkCard/LinkCard'
import MarkdownSnippet from './MarkdownSnippet/MarkdownSnippet'

type TRecipeDataProps = {
  recipeUrl?: URL
  recipe: TRecipe
  instructions?: string
}

const RecipeData: React.FC<TRecipeDataProps> = ({ recipeUrl, recipe, instructions }) => (
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

    {!!instructions && (
      <section className="w-full flex flex-col items-start bg-light">
        <MarkdownSnippet instructionsHtml={instructions} className="p-8 py-16 text-darkest" />
      </section>
    )}
  </div>
)

export default RecipeData
