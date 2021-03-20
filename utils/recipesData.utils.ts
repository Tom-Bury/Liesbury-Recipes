import fetch from 'node-fetch'
import neatCsv from 'neat-csv'
import { TRecipe } from 'types/recipe.type'
import LoggingService from 'services/LoggingService'
import OGS from 'open-graph-scraper'
import StorageService from 'services/StorageService'

const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'

const stringHash = (str: string): number => {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
}

const downloadFileFromUrl = async (url: string): Promise<Buffer> => {
  const res = await fetch(url.trim())
  const buffer = await res.buffer()
  return buffer
}

const getOpenGraphImgUrl = async (url: string): Promise<string | null> => {
  try {
    const { error, result } = await OGS({ url: url.trim() })
    if (!error && result.success) {
      const ogData = result as any
      return ogData.ogImage.url
    }
    return null
  } catch (error) {
    return null
  }
}

const savePreviewImages = (recipes: TRecipe[]) => {
  recipes.forEach(async r => {
    const fileName = `${stringHash(r.title)}.jpg`
    const exists = await StorageService.fileExists(fileName)
    if (!exists) {
      if (r.imgUrl) {
        LoggingService.writeLog(`Fetching custom image for ${r.url}: ${r.imgUrl}`)
        const img = await downloadFileFromUrl(r.imgUrl)
        StorageService.uploadFile(img, fileName)
      } else {
        LoggingService.writeLog(`Fetching OG image for ${r.url}`)
        const imgUrl = await getOpenGraphImgUrl(r.url)
        if (imgUrl) {
          const img = await downloadFileFromUrl(imgUrl)
          StorageService.uploadFile(img, fileName)
        }
      }
    }
  })
}

const getRecipeImagePath = (recipe: TRecipe): string => {
  const fileName = `${stringHash(recipe.title)}.jpg`
  return `${StorageService.bucketUrl}/${fileName}`
}

export const getAllRecipes = async (): Promise<TRecipe[]> => {
  try {
    const res = await fetch(SHEETS_DATA_URL)
    const text = await res.buffer()
    const recipes = await neatCsv<TRecipe>(text)
    LoggingService.writeLog(`Successfully fetched ${recipes.length} recipes`)
    savePreviewImages(recipes)
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
    LoggingService.writeLog(error)
    // TODO: save recipes in file & retrieve ?
    return []
  }
}

export const test = () => null
