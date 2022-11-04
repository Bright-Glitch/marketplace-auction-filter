/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['axiecdn.axieinfinity.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'assets.axieinfinity.com',
    //     port: '',
    //     pathname: '/axies/**',
    //   },
    // ],
  },
}

module.exports = nextConfig
