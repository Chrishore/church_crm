import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect routes under (main) route group
 * Redirects unauthenticated users to /login
 */
export async function middleware(request: NextRequest) {
  // Get session cookie
  const sessionCookie = request.cookies.get('church_crm_session');

  // If no session cookie, redirect to login
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Valid session cookie exists, allow request to proceed
  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/members/:path*',
    '/events/:path*',
  ],
};
