/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for @supabase/supabase-js dynamic require warnings
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

module.exports = nextConfig
