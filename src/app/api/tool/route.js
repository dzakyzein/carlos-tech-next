// src/app/api/tool/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';

const toolSchema = z.object({
  title: z.string().min(2, 'Judul minimal 2 karakter'),
  type: z.string().min(2, 'Tipe minimal 2 karakter'),
  description: z.string().min(5, 'Deskripsi minimal 5 karakter'),
  imageUrl: z.string().url('Image harus berupa URL'),
});

// POST → Tambah tool baru
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = toolSchema.parse(body);

    const newTool = await prisma.tool.create({
      data: validatedData,
    });

    return NextResponse.json(newTool, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error create tool:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET → Ambil semua tool
export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error get tools:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
