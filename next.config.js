/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [
      "app",
      "components",
      "config",
      "utils",
    ]
  },
}

module.exports = nextConfig
