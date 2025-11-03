import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';

// Define the supported locales
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return Response.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    );
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, svg, png, jpg, jpeg, gif, webp files
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};