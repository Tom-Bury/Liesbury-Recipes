const fetch = require('node-fetch')
const neatCsv = require('neat-csv')
const { GoogleAuth } = require('google-auth-library')
const bucket = require('./bucket')

const auth = new GoogleAuth()

const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'
const RECIPES_BUCKET_FILENAME = 'recipes.json'
const GENERATE_PREVIEWS_FUNCTION_URL = 'https://europe-west1-lies-bury-recipes.cloudfunctions.net/preview-images'

async function fetchPreviewImageForRecipe(recipe) {
  console.info(`request ${GENERATE_PREVIEWS_FUNCTION_URL} for ${recipe.title}`)
  const client = await auth.getIdTokenClient(GENERATE_PREVIEWS_FUNCTION_URL)
  const res = await client.request({ method: 'post', url: GENERATE_PREVIEWS_FUNCTION_URL, data: recipe })
  console.info(res.data)
}

fetchPreviewImageForRecipe().catch(err => {
  console.error('callPreviews ERROR', err.message)
  process.exitCode = 1
})

exports.entry = async (req, res) => {
  const sheetRes = await fetch(SHEETS_DATA_URL)
  const sheetTextData = await sheetRes.buffer()
  const recipesData = await neatCsv(sheetTextData)
  await bucket.uploadFile(JSON.stringify(recipesData), RECIPES_BUCKET_FILENAME)

  const availableRecipeImages = await bucket.getAllFileNames()
  const recipes = recipesData.map(r => ({ fileName: `${bucket.stringHash(r.title)}.jpg`, ...r }))

  const toFetch = recipes.filter(r => !availableRecipeImages.includes(r.fileName))

  let fetchResponse

  await Promise.all(
    (fetchResponse = toFetch.map(async r => {
      try {
        return await fetchPreviewImageForRecipe(r)
      } catch (e) {
        return {
          recipe: r,
          error: e
        }
      }
    }))
  )

  res.status(200).json({
    recipes,
    availableRecipeImages,
    toFetch,
    fetchResponse
  })
}
