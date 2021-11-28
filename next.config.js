/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/tdx/:path*",
        destination: "https://ptx.transportdata.tw/:path*",
      },
      {
        source: "/api/motc/:path*",
        destination: "https://link.motc.gov.tw/:path*",
      },
    ];
  },
};
