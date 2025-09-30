import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',                 // для статичного експорту
  basePath: '/06-notehub-nextjs',   // назва твого репозиторію
  assetPrefix: '/06-notehub-nextjs/', // префікс для стилів і JS
};

export default nextConfig;
