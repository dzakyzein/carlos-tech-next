import { PrismaClient } from '@prisma/client';
import ReservationsClient from './ReservationsClient';

const prisma = new PrismaClient();

// Fungsi untuk mengambil data dari server
async function getReservations() {
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reservations;
}

export default async function ReservationsPage() {
  // Ambil data reservasi
  const reservations = await getReservations();

  // Oper data ke Client Component
  return <ReservationsClient reservations={reservations} />;
}
