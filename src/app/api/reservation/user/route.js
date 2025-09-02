// src/app/api/reservation/user/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil session user
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Cari user berdasarkan email dari session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Pengguna tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Ambil semua reservasi user ini
    const reservations = await prisma.reservation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Error in API route /api/reservation/user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan internal server.', error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
