/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import("./src/env.js").catch((e) => {
  // If there's an error loading the env file, only show error if it's not due to missing env variables
  if (process.env.SKIP_ENV_VALIDATION !== 'true') {
    console.error(e);
    throw e;
  }
});

/** @type {import("next").NextConfig} */
const nextConfig = {};

async function createConfig() {
  // Bundle Analyzer Configuration
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
      enabled: true,
    });
    return withBundleAnalyzer(nextConfig);
  }
  return nextConfig;
}

export default createConfig();
