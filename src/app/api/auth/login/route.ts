import { NextRequest, NextResponse } from 'next/server';
import { getUsersFromFile, verifyPassword } from '@/lib/auth';

// Rate limiting storage (module-level, in-memory)
const failedAttemptsByUsername = new Map<
  string,
  { attempts: number; lockedUntil: number | null }
>();
const failedAttemptsByIP = new Map<
  string,
  { attempts: number; lockedUntil: number | null }
>();

// Constants
const MAX_ATTEMPTS = 3;
const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Format remaining time in milliseconds to human-readable string
 */
function formatRemainingTime(milliseconds: number): string {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
}

/**
 * Get client IP address from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take first IP if multiple are present
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback for local development
  return '127.0.0.1';
}

/**
 * Check if username or IP is currently locked due to rate limiting
 * Returns error response if locked, null if not locked
 */
function checkRateLimiting(
  username: string,
  ip: string
): NextResponse | null {
  const now = Date.now();

  // Check username rate limiting
  const usernameData = failedAttemptsByUsername.get(username);
  if (usernameData && usernameData.lockedUntil) {
    if (now < usernameData.lockedUntil) {
      // Still locked
      const remainingTime = usernameData.lockedUntil - now;
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please wait ${formatRemainingTime(remainingTime)}.`,
        },
        { status: 429 }
      );
    } else {
      // Cooldown expired, reset
      failedAttemptsByUsername.delete(username);
    }
  }

  // Check IP rate limiting
  const ipData = failedAttemptsByIP.get(ip);
  if (ipData && ipData.lockedUntil) {
    if (now < ipData.lockedUntil) {
      // Still locked
      const remainingTime = ipData.lockedUntil - now;
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please wait ${formatRemainingTime(remainingTime)}.`,
        },
        { status: 429 }
      );
    } else {
      // Cooldown expired, reset
      failedAttemptsByIP.delete(ip);
    }
  }

  return null;
}

/**
 * Record a failed login attempt for username and IP
 */
function recordFailedAttempt(username: string, ip: string): void {
  const now = Date.now();

  // Record failed attempt for username
  const usernameData = failedAttemptsByUsername.get(username) || {
    attempts: 0,
    lockedUntil: null,
  };
  usernameData.attempts += 1;

  if (usernameData.attempts >= MAX_ATTEMPTS) {
    usernameData.lockedUntil = now + COOLDOWN_DURATION;
  }

  failedAttemptsByUsername.set(username, usernameData);

  // Record failed attempt for IP
  const ipData = failedAttemptsByIP.get(ip) || {
    attempts: 0,
    lockedUntil: null,
  };
  ipData.attempts += 1;

  if (ipData.attempts >= MAX_ATTEMPTS) {
    ipData.lockedUntil = now + COOLDOWN_DURATION;
  }

  failedAttemptsByIP.set(ip, ipData);
}

/**
 * Clear failed attempts for username and IP (on successful login)
 */
function clearFailedAttempts(username: string, ip: string): void {
  failedAttemptsByUsername.delete(username);
  failedAttemptsByIP.delete(ip);
}

/**
 * POST /api/auth/login
 * Authenticate user with username and password
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse request body
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Step 2: Get client IP address
    const clientIP = getClientIP(request);

    // Step 3 & 4: Check rate limiting
    const rateLimitResponse = checkRateLimiting(username, clientIP);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Step 5: Verify credentials
    const users = await getUsersFromFile();
    const user = users.find((u) => u.username === username);

    if (!user) {
      // User not found
      recordFailedAttempt(username, clientIP);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      // Password incorrect
      recordFailedAttempt(username, clientIP);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Step 7: Successful authentication
    clearFailedAttempts(username, clientIP);

    // Create session cookie
    const response = NextResponse.json({
      success: true,
      username: user.username,
    });

    response.cookies.set('church_crm_session', user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
