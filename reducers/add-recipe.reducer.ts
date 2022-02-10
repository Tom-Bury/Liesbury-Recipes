import { TRecipe } from 'backend/types/recipes.types'

export enum ERecipeKeys {
  recipeId = 'recipeId',
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl',
  instructions = 'instructions',
  tips = 'tips',
  imgFile = 'imgFile'
}

type TAddRecipeFormState = {
  [ERecipeKeys.recipeId]?: string
  [ERecipeKeys.recipeTitle]?: string
  [ERecipeKeys.recipeUrl]?: string
  [ERecipeKeys.imgUrl]?: string
  [ERecipeKeys.instructions]?: {
    markdown: string
    html: string
  }
  [ERecipeKeys.tips]?: {
    markdown: string
    html: string
  }
  [ERecipeKeys.imgFile]?: string
}

type TSimpleFormAction = {
  type: 'simple'
  key: ERecipeKeys.recipeId | ERecipeKeys.recipeTitle | ERecipeKeys.recipeUrl | ERecipeKeys.imgUrl | ERecipeKeys.imgFile
  value: string
}

type TMarkdownFormAction = {
  type: 'markdown'
  key: ERecipeKeys.instructions | ERecipeKeys.tips
  markdown: string
  html: string
}

type TListFormAction = {
  type: 'list'
  key: ERecipeKeys.tips
  values: string[]
}

type TFullRecipeFormAction = {
  type: 'full-recipe'
  recipe: TRecipe
}

type TAddRecipeFormAction = TSimpleFormAction | TMarkdownFormAction | TListFormAction | TFullRecipeFormAction

export const addRecipeFormReducer = (state: TAddRecipeFormState, action: TAddRecipeFormAction): TAddRecipeFormState => {
  switch (action.type) {
    case 'simple':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'markdown':
      return {
        ...state,
        [action.key]: {
          markdown: action.markdown,
          html: action.html
        }
      }
    case 'list':
      return {
        ...state // TODO
      }
    case 'full-recipe': {
      const { id, title, imgUrl, url, instructions } = action.recipe
      return {
        [ERecipeKeys.recipeId]: id,
        [ERecipeKeys.recipeTitle]: title,
        [ERecipeKeys.instructions]: {
          markdown: instructions,
          html: ''
        },
        [ERecipeKeys.imgUrl]: imgUrl,
        [ERecipeKeys.recipeUrl]: url
      }
    }
    default:
      throw Error('Unsupported Add Recipe Form Action')
  }
}
