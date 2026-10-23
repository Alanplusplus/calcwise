import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
  },
  async redirects() {
    return [
      // The generic "basic calculator" page ranked for arithmetic queries
      // (e.g. "5+5") that Google answers inline, so it earned impressions
      // but no clicks and diluted the site's financial focus. Retired.
      {
        source: "/calculators/basic/:path*",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
