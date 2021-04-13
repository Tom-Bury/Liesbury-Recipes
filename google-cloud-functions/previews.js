const fetch = require('node-fetch')
const ogs = require('open-graph-scraper')
const bucket = require('./bucket')

const downloadFileFromUrl = async url => {
  const res = await fetch(url.trim())
  const buffer = await res.buffer()
  return buffer
}

const getOpenGraphImgUrl = async url => {
  try {
    const { error, result } = await ogs({ url: url.trim(), timeout: 5000 })
    console.info('OG error', error)
    console.info('OG result', result.success)
    if (!error && result.success) {
      console.info('OG found', result.ogImage.url || result.twitterImage.url)
      return result.ogImage.url || result.twitterImage.url
    }
    return null
  } catch (error) {
    console.error('Error catch getOpenGraphImgUrl', error)
    return null
  }
}

exports.entry = async (req, res) => {
  const { fileName, url, imgUrl } = req.body

  let img

  if (imgUrl) {
    img = await downloadFileFromUrl(imgUrl)
  } else {
    const ogImgUrl = await getOpenGraphImgUrl(url)
    if (ogImgUrl) {
      img = await downloadFileFromUrl(ogImgUrl)
    }
  }

  if (img) {
    await bucket.uploadFile(img, fileName)
    res.status(200).json({
      fileName,
      url,
      imgUrl
    })
  } else {
    res.status(404).json({
      fileName,
      url,
      imgUrl
    })
  }
}
