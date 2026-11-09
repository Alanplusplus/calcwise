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
      // Number-only variants removed earlier still show up in Search Console
      // and return 404; send them to the closest topical calculator instead.
      {
        source: "/calculators/compound-interest/:amount(1000-start|5000-start)",
        destination: "/calculators/compound-interest",
        statusCode: 301,
      },
      {
        source: "/calculators/debt-payoff/30000-student-loan",
        destination: "/calculators/student-loan",
        statusCode: 301,
      },
      {
        source: "/calculators/debt-payoff/5000-credit-card",
        destination: "/calculators/credit-card-payoff",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
