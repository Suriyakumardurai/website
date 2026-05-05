'use client';

import { usePathname } from 'next/navigation';

export default function SmartPreconnect() {
  const path = usePathname();

  const preconnects: Record<string, string[]> = {
    '/': [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    // Add more routes here as the site grows
  };

  const urls = preconnects[path] || preconnects['/'];

  return (
    <>
      {urls.map(url => (
        <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}
    </>
  );
}
