import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUsersFromFile } from './lib/auth';

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

  const username = sessionCookie.value;

  try {
    // Verify username exists in users.json
    const users = await getUsersFromFile();
    const userExists = users.some((user) => user.username === username);

    if (!userExists) {
      // Invalid session, clear cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('church_crm_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
      return response;
    }

    // Valid session, allow request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login for safety
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/members/:path*',
    '/calendar/:path*',
    '/events/:path*',
  ],
};
