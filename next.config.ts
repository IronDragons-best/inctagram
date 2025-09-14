import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

const envFile = process.env.APP_ENV === 'prod' ? '.env.production' : '.env.stage'
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile })
}

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['storage.yandexcloud.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '**',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'), // Базовый алиас для корня
    }
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    })
    return config
  },
}

export default nextConfig
