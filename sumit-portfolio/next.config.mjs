/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/colophon", destination: "/#colophon", permanent: false }];
  },
  env: {
    // Captured once at build — the telemetry bar reports the age of the deploy, honestly.
    BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
