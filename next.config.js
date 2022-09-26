/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  serverRuntimeConfig: {
    secret: process.env.NEXT_PUBLIC_SECRET,
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NEXT_PUBLIC_NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api', // production api
  },
  images: {
    domains: [
      'help.twitter.com',
      'picsum.photos',
      'images.unsplash.com',
      'cdn.cnn.com',
      'media.cnn.com',
      'randomuser.me',
    ],
  },
};

module.exports = nextConfig;
