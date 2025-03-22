/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
  },
  middleware: true,
};

export default nextConfig;
