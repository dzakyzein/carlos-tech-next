import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

const prisma = new PrismaClient();

// Konfigurasi API untuk menonaktifkan body parser bawaan Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Dapatkan sesi pengguna
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Karena body parser dinonaktifkan, kita perlu mem-parsing FormData secara manual
    // Catatan: Di lingkungan produksi, Anda akan menggunakan library seperti 'formidable' atau 'busboy'
    // untuk parsing yang aman. Untuk tujuan demonstrasi ini, kita akan asumsikan parsing sederhana.
    const file = req.files.paymentProof; // Ini adalah placeholder, bukan kode yang berfungsi
    const reservationId = req.fields.reservationId; // Ini juga placeholder

    // Untuk demo ini, kita akan simulasikan URL file
    const simulatedFileUrl = `https://example.com/proofs/${reservationId}-${Date.now()}.jpg`;

    // Pastikan reservasiID ada
    if (!reservationId) {
      return res
        .status(400)
        .json({ message: 'Reservation ID tidak ditemukan.' });
    }

    // Perbarui reservasi di database Prisma
    const updatedReservation = await prisma.reservation.update({
      where: {
        id: parseInt(reservationId),
      },
      data: {
        paymentProof: simulatedFileUrl,
        // Status pembayaran tetap 'BELUM_LUNAS' sampai diverifikasi oleh admin
        // Atau Anda bisa menambahkan 'status: "MENUNGGU_VERIFIKASI"' jika skema Anda memilikinya
      },
    });

    // Kirim data reservasi yang diperbarui
    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error(
      'Error in API route /api/reservations/upload-payment-proof:',
      error
    );
    res.status(500).json({ message: 'Gagal mengunggah bukti pembayaran.' });
  } finally {
    await prisma.$disconnect();
  }
}
