export type TRecipe = {
  title: string
  imgUrl?: string
  url?: string
  id: string
  instructions?: string
  tips?: string
  ingredients?: string[]
  categories?: string[]
  blurHash?: string
  isPreview?: boolean
}

export type TRecipeWithoutData = Pick<TRecipe, 'id' | 'title' | 'imgUrl' | 'blurHash'>
