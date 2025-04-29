import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Self-Destruct Control Panel',
    short_name: 'Self-Destruct',
    description: 'Example for kubernetes pod replacement',
    lang: 'en',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon/icon-400x400.jpg',
        sizes: '400x400',
        type: 'image/jpg',
      },
    ],
  };
}
