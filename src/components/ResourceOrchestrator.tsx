import React from 'react';

/**
 * RESOURCE ORCHESTRATOR
 * 
 * Manages the priority cascade of resource hints to optimize 
 * the rendering pipeline for both users and the Googlebot WRS.
 */
export function ResourceOrchestrator({ route }: { route: string }) {
  // Critical path resources
  const critical = [
    <link key="fonts-pre" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
  ];

  // Route-specific prefetches
  const routePrefetch: Record<string, React.ReactNode[]> = {
    '/': [
      <link key="hero-img" rel="preload" href="/logo.png" as="image" />,
    ],
  };

  // Third-party connections
  const thirdParty = [
    <link key="va-pre" rel="preconnect" href="https://va.vercel-scripts.com" />,
  ];

  return (
    <>
      {critical}
      {routePrefetch[route] || []}
      {thirdParty}
    </>
  );
}
