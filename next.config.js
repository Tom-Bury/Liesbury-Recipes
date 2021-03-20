module.exports = {
  target: process.env.BUILD_TARGET || 'server',
  images: {
    domains: ['storage.googleapis.com']
  }
}
