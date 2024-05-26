/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreBuildErrors: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**',
      port: '',
      pathname: '**',
    }, ],
  },
};

export default nextConfig;