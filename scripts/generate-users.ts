import { hashPassword } from '../src/lib/auth';
import fs from 'fs/promises';
import path from 'path';

async function generateUsers() {
  const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'pastor', password: 'pastor123' },
    { username: 'staff', password: 'staff123' },
  ];

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      username: user.username,
      passwordHash: await hashPassword(user.password),
    }))
  );

  const outputPath = path.join(process.cwd(), 'data', 'users.json');
  await fs.writeFile(outputPath, JSON.stringify(hashedUsers, null, 2), 'utf-8');

  console.log('Users file generated successfully at:', outputPath);
  console.log('Users:', hashedUsers.map((u) => u.username).join(', '));
}

generateUsers().catch(console.error);
