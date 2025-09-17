import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/visitors
export async function POST(req) {
  try {
    const { platform } = await req.json();

    if (!platform || !['DESKTOP', 'MOBILE'].includes(platform)) {
      return NextResponse.json(
        { error: 'Platform must be DESKTOP or MOBILE' },
        { status: 400 }
      );
    }

    const visitor = await prisma.visitor.create({
      data: { platform },
    });

    return NextResponse.json(visitor, { status: 201 });
  } catch (error) {
    console.error('POST /api/visitors error:', error);
    return NextResponse.json(
      { error: 'Failed to save visitor' },
      { status: 500 }
    );
  }
}

// GET /api/visitors
export async function GET() {
  try {
    const visitors = await prisma.visitor.findMany({
      select: { platform: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    // Grouping per tanggal
    const grouped = {};
    visitors.forEach((v) => {
      const date = v.createdAt.toISOString().split('T')[0]; // yyyy-mm-dd
      if (!grouped[date]) {
        grouped[date] = { date, desktop: 0, mobile: 0 };
      }
      if (v.platform === 'DESKTOP') grouped[date].desktop += 1;
      if (v.platform === 'MOBILE') grouped[date].mobile += 1;
    });

    const result = Object.values(grouped);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('GET /api/visitors error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}
