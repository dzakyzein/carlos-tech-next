import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, context) {
  const { id } = await context.params;
  const { status, progress } = await req.json();

  try {
    const updatedReservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: { ...(status && { status }), ...(progress && { progress }) },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error('Error update status:', error);
    return NextResponse.json(
      { message: 'Gagal update status' },
      { status: 500 }
    );
  }
}
