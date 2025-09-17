import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { platform } = await req.json();

    if (!platform || !['DESKTOP', 'MOBILE'].includes(platform)) {
      return Response.json({ error: 'Platform tidak valid' }, { status: 400 });
    }

    const visitor = await prisma.visitor.create({
      data: { platform },
    });

    return Response.json(visitor);
  } catch (error) {
    console.error('Error track visitor:', error);
    return Response.json({ error: 'Gagal menyimpan visitor' }, { status: 500 });
  }
}
