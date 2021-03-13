import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import Image from 'next/image'
import { Card, ElementTitle } from '.'

type TProps = {
  recipe: TRecipe
}

const RecipeCard: React.FC<TProps> = ({ recipe }) => (
  <Card className="max-w-sm w-full">
    <div className="flex flex-col h-80 p-4">
      <div className="w-full h-60 relative">
        <Image className="rounded-xl" src={recipe.imgUrl} alt={recipe.title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex-1 flex-col p-6">
        <ElementTitle>{recipe.title}</ElementTitle>
      </div>
    </div>
  </Card>
)

export default RecipeCard
