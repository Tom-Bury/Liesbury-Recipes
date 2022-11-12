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
  [ERecipeKeys.categories]?: Set<string>
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
  key: ERecipeKeys.ingredients
  value: string
}

type TListRemoveFormAction = {
  type: 'list-remove'
  key: ERecipeKeys.ingredients
  index: number
}

type TSetAddFormAction = {
  type: 'set-add'
  key: ERecipeKeys.categories
  value: string
}

type TSetRemoveFormAction = {
  type: 'set-remove'
  key: ERecipeKeys.categories
  value: string
}

type TFullRecipeFormAction = {
  type: 'full-recipe'
  recipe: TRecipe
}

type TAddRecipeFormAction =
  | TSimpleFormAction
  | TListAddFormAction
  | TListRemoveFormAction
  | TSetAddFormAction
  | TSetRemoveFormAction
  | TFullRecipeFormAction

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
        [action.key]: [...(state[action.key] || []), action.value.trim()]
      }
    case 'list-remove': {
      const newList = state[action.key] || []
      newList.splice(action.index, 1)
      return {
        ...state,
        [action.key]: newList.length > 0 ? newList : undefined
      }
    }
    case 'set-add': {
      return {
        ...state,
        [action.key]: new Set([...(state[action.key] || []), action.value.trim().toLowerCase()])
      }
    }
    case 'set-remove': {
      const newSet = new Set(state[action.key])
      newSet.delete(action.value.trim().toLowerCase())
      return {
        ...state,
        [action.key]: newSet
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
        [ERecipeKeys.categories]: new Set(categories?.map(c => c.trim().toLowerCase()))
      }
    }
    default:
      throw Error('Unsupported Add Recipe Form Action')
  }
}
