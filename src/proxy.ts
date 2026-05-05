import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  // ---- FORCE TRAILING SLASH CONSISTENCY (Remove them) ----
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const newUrl = new URL(url.pathname.slice(0, -1), url.origin);
    return NextResponse.redirect(newUrl, 308);
  }

  // ---- FORCE LOWERCASE URLs ----
  if (url.pathname !== url.pathname.toLowerCase()) {
    const newUrl = new URL(url.pathname.toLowerCase(), url.origin);
    return NextResponse.redirect(newUrl, 308);
  }

  // ---- STRIP MARKETING PARAMETERS FROM CANONICAL ----
  const paramsToStrip = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref'];
  const cleanUrl = new URL(url.toString());
  let stripped = false;
  paramsToStrip.forEach(param => {
    if (cleanUrl.searchParams.has(param)) {
      cleanUrl.searchParams.delete(param);
      stripped = true;
    }
  });

  // Set clean canonical in header
  response.headers.set('Link', `<${cleanUrl.origin}${cleanUrl.pathname}>; rel="canonical"`);

  // ---- CONTENT SECURITY POLICY ----
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' blob: https://va.vercel-scripts.com;
    worker-src 'self' blob:;
    frame-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  
  // ---- SECURITY & PERFORMANCE HEADERS ----
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Last-Modified', new Date().toUTCString());
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (png, jpg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
