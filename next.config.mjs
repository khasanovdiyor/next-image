/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "next-image.idlengineer.uz"],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/7.x/pixel-art/svg/**",
      },
      {
        protocol: "https",
        hostname: "next-image.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
