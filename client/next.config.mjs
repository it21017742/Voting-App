/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Voting-App",
  assetPrefix: "/Voting-App",
};

export default nextConfig;
