/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Configure the base path for GitHub Pages
  // Use empty string since this is a custom domain at the root
  basePath: '',
  // Disable image optimization since GitHub Pages doesn't support it
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 