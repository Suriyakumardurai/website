import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AutoPlanet Corporation',
    short_name: 'AutoPlanet',
    description: 'AI-Powered Automation for Your Business',
    start_url: '/',
    display: 'standalone',
    background_color: '#030014',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
