import { NextRequest, NextResponse } from 'next/server';
import { getUsersFromFile } from '@/lib/auth';

/**
 * GET /api/auth/user
 * Get current authenticated user's data
 */
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('church_crm_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const username = sessionCookie.value;

    // Verify username exists in users.json
    const users = await getUsersFromFile();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Return user data (without password hash)
    return NextResponse.json({
      username: user.username,
      // name field doesn't exist in current data structure, but support it if added
      name: (user as any).name || undefined
    });
  } catch (error) {
    console.error('Fetch user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
