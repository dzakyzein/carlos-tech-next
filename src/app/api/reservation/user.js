import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Hanya izinkan metode GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Dapatkan sesi pengguna dari NextAuth.js
    const session = await getServerSession(req, res, authOptions);

    // Jika tidak ada sesi, kirim respons 401 Unauthorized
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Dapatkan email pengguna dari sesi
    const userEmail = session.user.email;

    // Cari pengguna di database berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // Ambil semua reservasi yang terkait dengan user ID ini
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: user.id,
      },
      // Anda bisa menambahkan 'orderBy' jika ingin mengurutkan, misalnya berdasarkan tanggal
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Kirim data reservasi sebagai respons
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error in API route /api/reservations/user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal server.' });
  } finally {
    // Tutup koneksi Prisma setelah selesai
    await prisma.$disconnect();
  }
}
