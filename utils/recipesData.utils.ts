import fetch from 'node-fetch'
import neatCsv from 'neat-csv'
import { TRecipe } from 'types/recipe.type'
import LoggingService from 'services/LoggingService'
import OGS from 'open-graph-scraper'
import { stat, writeFile } from 'fs'
import path from 'path'

const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'previews')

const stringHash = (str: string): number => {
  // eslint-disable-next-line no-bitwise
  return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
}

const downloadImage = async (fileName: number, url: string) => {
  const res = await fetch(url.trim())
  const buffer = await res.buffer()
  writeFile(`${IMAGES_DIR}/${fileName}.jpg`, buffer, err => {
    if (err) {
      LoggingService.writeLog(`ERROR - Download image failed for ${url} to ${fileName}.jpg`)
    } else {
      LoggingService.writeLog(`Downloaded image ${url} to ${fileName}.jpg`)
    }
  })
}

const fetchAndSaveOpenGraphImage = async (fileName: number, url: string) => {
  try {
    const { error, result } = await OGS({ url: url.trim() })
    if (!error && result.success) {
      const ogData = result as any
      if (ogData.ogImage && ogData.ogImage.url) {
        try {
          downloadImage(fileName, ogData.ogImage.url)
        } catch (err) {
          LoggingService.writeLog(`ERROR ${err.toString()} while downloading OG image ${ogData.ogImage.url} for ${url}`)
        }
      } else {
        LoggingService.writeLog(`ERROR while fetching OG image for ${url}`)
      }
    } else {
      LoggingService.writeLog(`ERROR while fetching OG data for ${url}`)
    }
  } catch (error) {
    LoggingService.writeLog(`ERROR ${error.toString()} while fetching OG data for ${url}`)
  }
}

const savePreviewImages = (recipes: TRecipe[]) => {
  recipes.forEach(r => {
    const fileName = stringHash(r.title)
    stat(`${IMAGES_DIR}/${fileName}.jpg`, (err, _) => {
      if (err) {
        if (r.imgUrl) {
          LoggingService.writeLog(`Fetching custom image for ${r.url}: ${r.imgUrl}`)
          downloadImage(fileName, r.imgUrl)
        } else {
          LoggingService.writeLog(`Fetching OG image for ${r.url}`)
          fetchAndSaveOpenGraphImage(fileName, r.url)
        }
      } else {
        LoggingService.writeLog(`Image for ${r.url} already present`)
      }
    })
  })
}

const getRecipeImagePath = (recipe: TRecipe): string => {
  const fileName = `${stringHash(recipe.title)}.jpg`
  return `/images/previews/${fileName}`
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
