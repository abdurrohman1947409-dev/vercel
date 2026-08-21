import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Minecraft player 3D head avatars via CravatarEU
        protocol: "https",
        hostname: "cravatar.eu",
        pathname: "/helmavatar/**",
      },
      {
        // Fallback: Crafatar (commonly used Minecraft avatar API)
        protocol: "https",
        hostname: "crafatar.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
