/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.bybit.com', 'cryptocompare.com'],
  },
}

module.exports = nextConfig
