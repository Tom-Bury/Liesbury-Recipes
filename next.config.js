const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  target: process.env.BUILD_TARGET || 'server',
  images: {
    domains: ['storage.googleapis.com']
  }
})
