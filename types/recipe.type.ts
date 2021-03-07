import { ECategory } from './enums'

export type TRecipe = {
  title: string
  url: string
  imgUrl: string
  mainCategory: ECategory
  subCategories: ECategory[]
}
