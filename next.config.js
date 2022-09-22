module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/bikes',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

