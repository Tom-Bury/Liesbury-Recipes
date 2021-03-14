module.exports = {
  target: process.env.BUILD_TARGET || 'server',
  images: {
    domains: ['images.immediate.co.uk', 'img.hellofresh.com'],
  },
}
