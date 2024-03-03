const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  images: {
    domains: ['storage.googleapis.com']
  }
})
