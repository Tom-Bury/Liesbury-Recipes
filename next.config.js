const withPWA = require('next-pwa')

module.exports = withPWA({
  target: process.env.BUILD_TARGET || 'server',
  images: {
    domains: ['storage.googleapis.com']
  },
  future: {
    webpack5: true
  },
  pwa: {
    dest: 'public',
    fallbacks: {
      image: 'images/liesbury-recipes-colored.svg'
    }
  }
})
