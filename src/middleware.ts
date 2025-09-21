import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('auth-session');

  const session = sessionCookie?.value;
  const [role] = session?.split(':') || [];

  // Protect artisan dashboard
  if (pathname.startsWith('/dashboard-artisan')) {
    if (!session || role !== 'artisan') {
      return NextResponse.redirect(new URL('/login-artisan', request.url));
    }
  }

  // Protect customer dashboard
  if (pathname.startsWith('/dashboard-customer')) {
     if (!session || role !== 'customer') {
      return NextResponse.redirect(new URL('/login-customer', request.url));
    }
  }

  // Protect original account page, redirect to new customer dashboard
  if (pathname.startsWith('/account')) {
    if (!session || role !== 'customer') {
      return NextResponse.redirect(new URL('/login-customer', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard-customer', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-artisan/:path*', '/dashboard-customer/:path*', '/account'],
};
