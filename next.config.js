/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
