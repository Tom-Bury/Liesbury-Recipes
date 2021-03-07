import * as React from 'react'
import { TRecipe } from 'types/recipe.type'
import Image from 'next/image'
import { Card } from '.'

type TProps = {
  recipe: TRecipe
}

const RecipeCard: React.FC<TProps> = ({ recipe }) => (
  <Card>
    <div className="flex flex-col md:flex-row h-60">
      <div className="h-60 w-full md:w-72 relative">
        <Image
          className="rounded-xl rounded-b-none md:rounded-bl-xl md:rounded-r-none shadow-inner"
          src={recipe.imgUrl}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col p-6">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  </Card>
)

export default RecipeCard
