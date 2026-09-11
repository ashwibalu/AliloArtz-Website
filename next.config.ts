import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["heic-convert"],
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
