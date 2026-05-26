import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: "export",
  // images: { unoptimized: true },
  productionBrowserSourceMaps: true,
  images: {
    domains: ["img.drz.lazcdn"],
    unoptimized: true,
  },
};

export default nextConfig;
