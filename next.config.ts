/** @type {import('next').NextConfig} */
import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "instagram.fdel11-3.fna.fbcdn.net"],
  },
  reactCompiler: true,
};

export default withNextVideo(nextConfig);
