import { Locale } from '@/i18n';
import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  locales,
  protectedRoutes,
  publicRoutes,
} from './constants';
import { verifySession } from './lib/sessions';

// Helper to determine locale
function getLocale(request: NextRequest): keyof Locale {
  const cookieLocale = request.cookies.get('locale')?.value as keyof Locale;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0])
      .find((lang) => locales.includes(lang as keyof Locale)) as keyof Locale;
    if (preferredLocale) return preferredLocale;
  }

  return DEFAULT_LOCALE;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Locale Handling
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;

    // TODO: Uncomment this once the i18n middleware is implemented
    // const response = NextResponse.redirect(url);
    // response.cookies.set('locale', locale, { path: '/', httpOnly: true });

    // return response;
  }

  // Authentication & Route Protection
  const isProtectedRoute = protectedRoutes.some((route) =>
    route.includes('*')
      ? pathname.startsWith(route.replace('/*', ''))
      : pathname === route,
  );
  const isPublicRoute = publicRoutes.some((route) =>
    route.includes('*')
      ? pathname.startsWith(route.replace('/*', ''))
      : pathname === route,
  );

  const cookie = request.cookies.get('session')?.value;
  const session = cookie
    ? await verifySession(cookie).catch(() => request.cookies.delete('session'))
    : null;

  if (isProtectedRoute && !session?.id)
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));

  if (isPublicRoute && session?.id)
    return NextResponse.redirect(new URL('/', request.nextUrl));

  return NextResponse.next();
}

// Config for Middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
