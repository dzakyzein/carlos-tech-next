import { PrismaClient } from '@prisma/client';
import ReservationsClient from './ReservationsClient';

const prisma = new PrismaClient();

export default async function ReservationsPage({ searchParams }) {
  const pageParam = (await searchParams)?.page;
  let page = parseInt(pageParam || '1', 10);
  const limit = 8;

  // ✅ pastikan page valid
  if (isNaN(page) || page < 1) page = 1;

  const total = await prisma.reservation.count();
  const totalPages = Math.ceil(total / limit);

  // ✅ fallback kalau page > totalPages
  if (page > totalPages && totalPages > 0) page = totalPages;

  const reservations = await prisma.reservation.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <ReservationsClient
      reservations={reservations}
      pagination={{
        total,
        page,
        limit,
        totalPages,
      }}
    />
  );
}
