import * as React from 'react'
import Image from 'next/image'
import Card from './Card/Card'
import ElementTitle from './ElementTitle'

type TProps = {
  title: string
  imgPath: string
}

const RecipeCard: React.FC<TProps> = ({ title, imgPath }) => {
  return (
    <Card className="max-w-sm w-full" hoverable>
      <div className="flex flex-col h-80 p-4">
        <div className="w-full h-60 relative">
          <Image className="rounded-xl" src={imgPath} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="flex-1 flex-col p-6">
          <ElementTitle>{title}</ElementTitle>
        </div>
      </div>
    </Card>
  )
}

export default RecipeCard
