import { TRecipe } from 'backend/types/recipes.types'

export enum ERecipeKeys {
  recipeId = 'recipeId',
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl',
  instructions = 'instructions',
  tips = 'tips',
  imgFile = 'imgFile',
  ingredients = 'ingredients',
  categories = 'categories'
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
  [ERecipeKeys.categories]?: string[]
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

type TListAddFormAction = {
  type: 'list-add'
  key: ERecipeKeys.ingredients | ERecipeKeys.categories
  value: string
}

type TListRemoveFormAction = {
  type: 'list-remove'
  key: ERecipeKeys.ingredients | ERecipeKeys.categories
  index: number
}

type TFullRecipeFormAction = {
  type: 'full-recipe'
  recipe: TRecipe
}

type TAddRecipeFormAction = TSimpleFormAction | TListAddFormAction | TListRemoveFormAction | TFullRecipeFormAction

export const addRecipeFormReducer = (state: TAddRecipeFormState, action: TAddRecipeFormAction): TAddRecipeFormState => {
  switch (action.type) {
    case 'simple':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'list-add':
      return {
        ...state,
        [action.key]: [...(state[action.key] || []), action.value]
      }
    case 'list-remove': {
      const newList = state[action.key] || []
      newList.splice(action.index, 1)
      return {
        ...state,
        [action.key]: newList.length > 0 ? newList : undefined
      }
    }
    case 'full-recipe': {
      const { id, title, imgUrl, url, instructions, tips, ingredients, categories } = action.recipe
      return {
        [ERecipeKeys.recipeId]: id,
        [ERecipeKeys.recipeTitle]: title,
        [ERecipeKeys.instructions]: instructions,
        [ERecipeKeys.imgUrl]: imgUrl,
        [ERecipeKeys.recipeUrl]: url,
        [ERecipeKeys.tips]: tips,
        [ERecipeKeys.ingredients]: ingredients,
        [ERecipeKeys.categories]: categories
      }
    }
    default:
      throw Error('Unsupported Add Recipe Form Action')
  }
}
