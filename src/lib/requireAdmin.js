import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Cek session + role admin sekaligus.
 * Pakai di awal setiap Route Handler yang butuh proteksi admin-only.
 *
 * Return:
 * - { session } kalau lolos (admin)
 * - { error: NextResponse } kalau gagal (langsung return ini dari route handler)
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    };
  }

  if (session.user.role !== 'admin') {
    return {
      error: NextResponse.json(
        { message: 'Forbidden: admin only' },
        { status: 403 },
      ),
    };
  }

  return { session };
}
