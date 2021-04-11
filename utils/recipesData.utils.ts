import fetch from 'node-fetch'
import neatCsv from 'neat-csv'
import { TRecipe } from 'types/recipe.type'
import * as dotenv from 'dotenv'

dotenv.config()

const BUCKET_URL = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}`
const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'

const stringHash = (str: string): number => {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
}

const getRecipeImagePath = (recipe: TRecipe): string => {
  const fileName = `${stringHash(recipe.title)}.jpg`
  return `${BUCKET_URL}/${fileName}`
}

export const getAllRecipes = async (): Promise<TRecipe[]> => {
  try {
    const res = await fetch(SHEETS_DATA_URL)
    const text = await res.buffer()
    const recipes = await neatCsv<TRecipe>(text)
    return recipes.map(r => {
      return {
        ...r,
        url: r.url.trim(),
        imgUrl: r.imgUrl.trim(),
        imgPath: getRecipeImagePath(r),
        id: `${stringHash(r.title)}`
      }
    })
  } catch (error) {
    // TODO: save recipes in file & retrieve ?
    return []
  }
}

export const getRecipeInstructionsMarkdown = async (url: string): Promise<string> => {
  try {
    const encoded = Buffer.from(url.trim()).toString('base64').replace('=', '').replace('/', '_').replace('+', '-')
    const oneDriveLink = `https://api.onedrive.com/v1.0/shares/u!${encoded}/root/content`
    console.log(oneDriveLink)
    const res = await fetch(oneDriveLink)
    return await res.text()
  } catch (error) {
    return ''
  }
}
