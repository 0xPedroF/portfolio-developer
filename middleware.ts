import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Disable automatic locale detection
  localeDetection: false,
  
  // Use 'as-needed' to only add locale prefix to non-default locale
  localePrefix: 'as-needed'
});

export const config = {
  // Match only paths that don't start with
  // - api (API routes)
  // - _next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /favicon.ico, /robots.txt, etc.
  // But matches:
  // - /
  // - /any/other/path
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 