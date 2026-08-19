import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    qualities: [60, 75, 85],
  },
  async rewrites() {
    return [
      {
        source: "/videos/Content_video_webm/:path*",
        destination: "/videos/AI/:path*",
      },
      {
        source: "/videos/Content%20video/:path*",
        destination: "/videos/AI/:path*",
      },
      {
        source: "/videos/content/:path*",
        destination: "/videos/AI/:path*",
      },
    ];
  },
};

export default nextConfig;
