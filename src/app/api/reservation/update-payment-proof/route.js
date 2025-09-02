// src/app/api/reservation/update-payment-proof/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // pastikan sudah ada prisma client

export async function PUT(req) {
  try {
    const { reservationId, fileUrl } = await req.json();

    if (!reservationId || !fileUrl) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id: parseInt(reservationId) },
      data: { paymentProof: fileUrl },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Error update payment proof:', error);
    return NextResponse.json(
      { error: 'Gagal update bukti pembayaran' },
      { status: 500 }
    );
  }
}
