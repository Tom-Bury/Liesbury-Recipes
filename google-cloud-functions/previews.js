const { Storage } = require('@google-cloud/storage')
const fetch = require('node-fetch')
const neatCsv = require('neat-csv')
const ogs = require('open-graph-scraper')
require('dotenv').config()

const BUCKET_NAME = process.env.GCS_BUCKET_NAME
const SHEETS_DATA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'
const SECRET = JSON.parse(Buffer.from(process.env.GCS_SERVICE_ACCOUNT, 'base64').toString())

const storage = new Storage({
  projectId: process.env.GC_PROJECT_ID,
  credentials: {
    client_email: SECRET.client_email,
    client_id: SECRET.client_id,
    private_key: SECRET.private_key
  }
})
const bucket = storage.bucket(BUCKET_NAME)

const consoleLog = (text, data = {}) => {
  console.log(text, JSON.stringify(data))
}

const getAllFileNames = async () => {
  const bucketFiles = await bucket.getFiles()
  return bucketFiles[0].map(f => f.name)
}

const uploadFile = async (file, fileName) => {
  const newFileRef = bucket.file(fileName)
  await newFileRef.save(file)
}

const stringHash = str => {
  return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
}

const downloadFileFromUrl = async url => {
  const res = await fetch(url.trim())
  const buffer = await res.buffer()
  return buffer
}

const getOpenGraphImgUrl = async url => {
  try {
    const { error, result } = await ogs({ url: url.trim() })
    if (!error && result.success) {
      return ogData.ogImage.url
    }
    return null
  } catch (error) {
    return null
  }
}

exports.entry = async (req, res) => {
  const sheetRes = await fetch(SHEETS_DATA_URL)
  const sheetTextData = await sheetRes.buffer()
  const recipes = await neatCsv(sheetTextData)

  const presentFiles = await getAllFileNames()
  const currFileNames = recipes.map(r => ({
    ...r,
    fileName: `${stringHash(r.title)}.jpg`
  }))
  const toFetch = currFileNames.filter(f => !presentFiles.includes(f.fileName))

  consoleLog('toFetch', toFetch)

  toFetch.forEach(async r => {
    if (r.imgUrl !== '') {
      const img = await downloadFileFromUrl(r.imgUrl)
      uploadFile(img, r.fileName)
      consoleLog(`Fetched imgUrl ${r.imgUrl}`)
    } else {
      const imgUrl = await getOpenGraphImgUrl(r.url)
      consoleLog(`Going to fetch OG url ${imgUrl}`)
      if (imgUrl) {
        const img = await downloadFileFromUrl(imgUrl)
        uploadFile(img, r.fileName)
      }
    }
  })

  res.status(200).json({
    recipes,
    presentFiles,
    toFetch
  })
}
