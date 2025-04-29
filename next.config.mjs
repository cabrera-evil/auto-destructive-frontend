/** @type {import('next').NextConfig} */
const nextConfig = {
  // ? INFO: Uncomment this line if you want to use the standalone mode (Docker)
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
