import { TRecipe } from 'backend/types/recipes.types'

export enum ERecipeKeys {
  recipeId = 'recipeId',
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl',
  instructions = 'instructions',
  tips = 'tips',
  imgFile = 'imgFile',
  ingredients = 'ingredients'
}

type TAddRecipeFormState = {
  [ERecipeKeys.recipeId]?: string
  [ERecipeKeys.recipeTitle]?: string
  [ERecipeKeys.recipeUrl]?: string
  [ERecipeKeys.imgUrl]?: string
  [ERecipeKeys.instructions]?: string
  [ERecipeKeys.tips]?: string
  [ERecipeKeys.imgFile]?: string
  [ERecipeKeys.ingredients]?: string[]
}

type TSimpleFormAction = {
  type: 'simple'
  key:
    | ERecipeKeys.recipeId
    | ERecipeKeys.recipeTitle
    | ERecipeKeys.recipeUrl
    | ERecipeKeys.imgUrl
    | ERecipeKeys.imgFile
    | ERecipeKeys.instructions
    | ERecipeKeys.tips
  value: string
}

type TListFormAction = {
  type: 'list'
  key: ERecipeKeys.ingredients
  values: string[]
}

type TFullRecipeFormAction = {
  type: 'full-recipe'
  recipe: TRecipe
}

type TAddRecipeFormAction = TSimpleFormAction | TListFormAction | TFullRecipeFormAction

export const addRecipeFormReducer = (state: TAddRecipeFormState, action: TAddRecipeFormAction): TAddRecipeFormState => {
  switch (action.type) {
    case 'simple':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'list':
      return {
        ...state // TODO
      }
    case 'full-recipe': {
      const { id, title, imgUrl, url, instructions, tips, ingredients } = action.recipe
      return {
        [ERecipeKeys.recipeId]: id,
        [ERecipeKeys.recipeTitle]: title,
        [ERecipeKeys.instructions]: instructions,
        [ERecipeKeys.imgUrl]: imgUrl,
        [ERecipeKeys.recipeUrl]: url,
        [ERecipeKeys.tips]: tips,
        [ERecipeKeys.ingredients]: ingredients
      }
    }
    default:
      throw Error('Unsupported Add Recipe Form Action')
  }
}
