import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalReservasi = await prisma.reservation.count();

    // Reservasi Aktif (masih dikerjakan, belum p100)
    const reservasiAktif = await prisma.reservation.count({
      where: {
        NOT: {
          progress: 'P100',
        },
      },
    });

    // Reservasi Dikerjakan (sudah selesai, tapi belum lunas)
    const reservasiDikerjakan = await prisma.reservation.count({
      where: {
        progress: 'P100',
        status: 'BELUM_LUNAS',
      },
    });

    // Reservasi Tuntas (selesai + lunas, siap dikirim)
    const reservasiTuntas = await prisma.reservation.count({
      where: {
        progress: 'P100',
        status: 'LUNAS',
      },
    });

    const totalUser = await prisma.user.count();

    return NextResponse.json({
      totalReservasi,
      reservasiAktif,
      reservasiDikerjakan,
      reservasiTuntas,
      totalUser,
    });
  } catch (error) {
    console.error('Error ambil stats:', error);
    return NextResponse.json(
      { error: 'Gagal ambil statistik' },
      { status: 500 }
    );
  }
}
