import fetch from 'node-fetch'
import neatCsv from 'neat-csv'
import { TRecipe } from 'types/recipe.type'
import LoggingService from 'services/LoggingService'

const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'

export const getAllRecipes = async (): Promise<TRecipe[]> => {
  try {
    const res = await fetch(SHEETS_DATA_URL)
    const text = await res.buffer()
    const recipes = await neatCsv<TRecipe>(text)
    LoggingService.writeLog('Recipes get success')
    return recipes
  } catch (error) {
    LoggingService.writeLog(error)
    // TODO: save recipes in file & retrieve ?
    return []
  }
}

export const getRecipe = async (id: string): Promise<TRecipe | null> => {
  return null
}
