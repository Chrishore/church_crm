import crypto from 'crypto';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const scrypt = promisify(crypto.scrypt);

export interface User {
  username: string;
  passwordHash: string;
}

/**
 * Hash a password with a random salt using crypto.scrypt
 * @param password - Plain text password to hash
 * @returns Promise<string> - Format: "salt.hash" (both hex-encoded)
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate random 16-byte salt
  const salt = crypto.randomBytes(16);

  // Hash password with salt using scrypt (64-byte hash, N=16384, r=8, p=1)
  const hash = (await scrypt(password, salt, 64)) as Buffer;

  // Return format: salt.hash (both hex-encoded)
  return `${salt.toString('hex')}.${hash.toString('hex')}`;
}

/**
 * Verify a password against a stored hash
 * @param password - Plain text password to verify
 * @param storedHash - Stored hash in format "salt.hash" (hex-encoded)
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  // Split stored hash to get salt and hash
  const [saltHex, hashHex] = storedHash.split('.');

  if (!saltHex || !hashHex) {
    return false;
  }

  // Convert salt from hex string to Buffer
  const salt = Buffer.from(saltHex, 'hex');

  // Hash the input password with the extracted salt
  const hash = (await scrypt(password, salt, 64)) as Buffer;

  // Convert stored hash from hex to Buffer
  const storedHashBuffer = Buffer.from(hashHex, 'hex');

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(hash, storedHashBuffer);
}

/**
 * Read users from the users.json file
 * @returns Promise<User[]> - Array of user objects
 */
export async function getUsersFromFile(): Promise<User[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as User[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error('Users file not found. Please ensure data/users.json exists.');
    }
    throw error;
  }
}
