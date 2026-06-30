// app/api/reservation/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';
import { requireAdmin } from '@/lib/requireAdmin';

const reservationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  type: z.enum([
    'alat berat',
    'gigi rasio motor',
    'gigi rasio mobil',
    'sparepart pabrik',
  ]),
  amount: z.number().int().min(1),
  note: z.string().optional(),
});

export async function GET(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.reservation.count(),
    ]);

    return NextResponse.json({
      data: reservations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch reservations failed:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reservations', error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  // Tetap shared — customer & admin sama-sama boleh bikin reservasi
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const validatedData = reservationSchema.parse(data);

    const newReservation = await prisma.reservation.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        price: 0,
      },
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 },
      );
    }

    console.error('Reservation creation failed:', error);
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
