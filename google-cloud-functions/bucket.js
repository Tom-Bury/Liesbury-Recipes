const { Storage } = require('@google-cloud/storage')
require('dotenv').config()

const BUCKET_NAME = process.env.GCS_BUCKET_NAME

const storage = new Storage()

const bucket = storage.bucket(BUCKET_NAME)

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

module.exports = {
  getAllFileNames,
  uploadFile,
  stringHash
}
