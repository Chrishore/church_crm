import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Clear session cookie and log out user
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear session cookie by setting maxAge to 0
  response.cookies.set('church_crm_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
