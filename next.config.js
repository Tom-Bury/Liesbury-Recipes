module.exports = {
  target: process.env.BUILD_TARGET || 'server',
  images: {
    domains: ['storage.googleapis.com']
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
