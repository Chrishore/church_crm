import { NextRequest, NextResponse } from 'next/server';
import { getUsersFromFile } from '@/lib/auth';

/**
 * GET /api/auth/check
 * Check if user has valid session
 */
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('church_crm_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const username = sessionCookie.value;

    // Verify username exists in users.json
    const users = await getUsersFromFile();
    const userExists = users.some((user) => user.username === username);

    if (!userExists) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, username });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
