/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three / drei ship ESM that benefits from transpilation in Next
  transpilePackages: ["three", "@react-three/fiber"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
