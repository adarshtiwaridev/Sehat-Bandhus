/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // ✅ allow external image host
  },
  outputFileTracingRoot: "D:\\Works\\SehatBandhu\\clinic"
};

export default nextConfig;
