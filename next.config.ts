import type { NextConfig } from "next";

/**
 * This project lives on an iCloud-synced Desktop. iCloud relocates files
 * while Turbopack writes its build cache, which corrupts `.next` and crashes
 * dev. Folders ending in `.nosync` are ignored by iCloud, so in development we
 * write the build there. Production (Vercel) keeps the standard `.next`.
 */
const nextConfig: NextConfig = {
  // Local (dev + local builds) writes to the iCloud-ignored dir; Vercel keeps `.next`.
  distDir: process.env.VERCEL ? ".next" : ".next-dev.nosync",
};

export default nextConfig;
