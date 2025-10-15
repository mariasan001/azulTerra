/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // <- esto genera /out al hacer build
  images: { unoptimized: true }, // si usas next/image en host estático
  // trailingSlash: true, // opcional para hosts que requieren slash final
};
module.exports = nextConfig;
