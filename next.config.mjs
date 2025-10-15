/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // <- obliga a crear /out
  images: { unoptimized: true } // <- necesario para next/image sin server
};
module.exports = nextConfig;