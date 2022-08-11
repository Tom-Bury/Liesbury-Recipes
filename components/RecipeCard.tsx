import * as React from 'react'
import Image from 'next/image'
import Card from './Card/Card'

type TProps = {
  title: string
  preloadImage: boolean
  imgPath?: string
  blurHash?: string
}

const RecipeCard: React.FC<TProps> = ({ title, imgPath, preloadImage, blurHash }) => {
  return (
    <Card className="rmMobileClickBox" hoverable gradient>
      <div className="flex flex-col h-80 p-4">
        <div className="w-full h-60 relative">
          {imgPath && (
            <Image
              className="rounded-xl"
              src={imgPath}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority={preloadImage}
              blurDataURL={blurHash}
              placeholder={blurHash ? 'blur' : 'empty'}
            />
          )}
          {!imgPath && <div className="rounded-xl bg-light shadow-inner w-full h-full" />}
        </div>
        <div className="flex-1 flex-col p-6">
          <h3 className="text-center text-dark">{title}</h3>
        </div>
      </div>
    </Card>
  )
}

export default RecipeCard
