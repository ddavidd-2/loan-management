import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const pathName = request.nextUrl.pathname;

  /* disallow /dashboard if not logged in */
  if (!session && pathName.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  /* redirect to /signin to /dashboard if already logged in */
  if (session && pathName.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/signin', '/dashboard/:path*'],
};