import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_IS_PROD === "true";

const nextConfig: NextConfig = { 
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/portfolio" : undefined,
  assetPrefix: isProd ? "/portfolio/" : undefined,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
