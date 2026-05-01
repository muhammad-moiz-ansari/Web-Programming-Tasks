import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Decode JWT from cookie — works in Edge Runtime (no Mongoose/DB)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const role = token?.role;

  // If authenticated user visits /login or /signup → redirect to their dashboard
  if (isLoggedIn && (pathname === '/login' || pathname === '/signup')) {
    const dest = role === 'ADMIN' ? '/admin' : '/agent';
    return NextResponse.redirect(new URL(dest, nextUrl));
  }

  // If not authenticated and trying to access a protected route → redirect to /login
  if (!isLoggedIn && pathname !== '/login' && pathname !== '/signup') {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // Role-based guards for authenticated users
  if (isLoggedIn) {
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/agent', nextUrl));
    }
    if (pathname.startsWith('/agent') && role !== 'AGENT') {
      return NextResponse.redirect(new URL('/admin', nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/login', '/signup'],
};
