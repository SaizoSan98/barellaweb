import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { adminUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE = 'admin_session';

export async function auth() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (session?.value === secret) {
    return { isAdmin: true };
  }
  return null;
}

export async function login(email: string, password: string) {
  const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  if (users.length === 0) return false;
  const valid = await bcrypt.compare(password, users[0].passwordHash);
  if (!valid) return false;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function changePassword(email: string, currentPassword: string, newPassword: string) {
  const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  if (users.length === 0) return { ok: false, error: 'Felhasználó nem található' };
  const valid = await bcrypt.compare(currentPassword, users[0].passwordHash);
  if (!valid) return { ok: false, error: 'Hibás jelenlegi jelszó' };
  const hash = await bcrypt.hash(newPassword, 12);
  await db.update(adminUsers).set({ passwordHash: hash, updatedAt: new Date() }).where(eq(adminUsers.email, email));
  return { ok: true };
}
