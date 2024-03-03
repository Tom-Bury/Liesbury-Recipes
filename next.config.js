const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

const childProcess = require('child_process')

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  images: {
    domains: ['storage.googleapis.com']
  },
  generateBuildId: async () => {
    const commitHash = childProcess.execSync('git log --pretty=format:"%h" -n1').toString().trim()
    return commitHash
  }
})
