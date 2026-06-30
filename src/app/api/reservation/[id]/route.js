import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireAdmin } from '@/lib/requireAdmin';

const updateSchema = z.object({
  status: z.enum(['LUNAS', 'BELUM_LUNAS']).optional(),
  progress: z.enum(['P0', 'P25', 'P50', 'P75', 'P100']).optional(),
  price: z.number().min(0, 'Harga tidak boleh negatif').optional(),
});

export async function PUT(req, context) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;
  const reservationId = Number(id);

  if (Number.isNaN(reservationId)) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: 'Body request tidak valid' },
      { status: 400 },
    );
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Validasi gagal', errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { status, progress, price } = parsed.data;

  try {
    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        ...(status !== undefined && { status }),
        ...(progress !== undefined && { progress }),
        ...(price !== undefined && { price }),
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Reservasi tidak ditemukan' },
        { status: 404 },
      );
    }
    console.error('Error update reservation:', error);
    return NextResponse.json(
      { message: 'Gagal update reservasi' },
      { status: 500 },
    );
  }
}
