'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Fungsi bantuan untuk men-format mata uang
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Fungsi utama komponen UserProfilePage
const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State untuk menyimpan data pesanan dan status loading
  const [reservations, setReservations] = useState([]);
  const [isReservationsLoading, setIsReservationsLoading] = useState(true);
  const [uploadingStatus, setUploadingStatus] = useState({});

  // Proteksi rute: Redirect jika pengguna belum login
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // Efek untuk mengambil data pesanan setelah sesi terverifikasi
  useEffect(() => {
    const fetchReservations = async () => {
      if (session) {
        setIsReservationsLoading(true);
        try {
          // Ganti URL ini dengan endpoint API Anda yang sebenarnya
          const response = await fetch('/api/reservations/user');
          if (!response.ok) {
            throw new Error('Gagal mengambil data pesanan.');
          }
          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          // Anda bisa menambahkan state error untuk menampilkan pesan ke pengguna
        } finally {
          setIsReservationsLoading(false);
        }
      }
    };

    if (session) {
      fetchReservations();
    }
  }, [session]);

  // Fungsi untuk menangani unggahan bukti pembayaran
  const handlePaymentProofUpload = async (reservationId, file) => {
    if (!file) {
      alert('Silakan pilih file untuk diunggah.');
      return;
    }

    setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'uploading' }));

    const formData = new FormData();
    formData.append('paymentProof', file);
    formData.append('reservationId', reservationId);

    try {
      // Ganti URL ini dengan endpoint API Anda untuk mengunggah bukti pembayaran
      const response = await fetch('/api/reservations/upload-payment-proof', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal mengunggah bukti pembayaran.');
      }

      const updatedReservation = await response.json();

      // Perbarui state lokal dengan data terbaru dari server
      setReservations((prev) =>
        prev.map((res) => (res.id === reservationId ? updatedReservation : res))
      );
      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'success' }));
    } catch (error) {
      console.error('Error uploading payment proof:', error);
      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'failed' }));
      alert('Gagal mengunggah bukti pembayaran. Silakan coba lagi.');
    }
  };

  // Tampilkan pesan loading saat NextAuth.js sedang memverifikasi sesi
  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <p className='text-xl text-gray-700 animate-pulse'>Memuat...</p>
      </div>
    );
  }

  // Tampilkan halaman profil jika sesi sudah ada
  if (session) {
    return (
      <div className='min-h-screen bg-gray-100 p-4 pt-20'>
        <div className='container mx-auto'>
          {/* Header Profil */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8 text-center'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
              Profil Pengguna
            </h1>

            <div className='mb-6'>
              <img
                src={session.user.image || '/profile.jpg'}
                alt='Profil Pengguna'
                className='w-32 h-32 rounded-full mx-auto border-4 border-gray-300 object-cover'
              />
            </div>

            <div className='space-y-4 text-left inline-block'>
              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Nama</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.name}
                </p>
              </div>

              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Email</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.email}
                </p>
              </div>

              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Peran (Role)</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Bagian Daftar Pesanan */}
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              Daftar Pesanan Saya
            </h2>

            {isReservationsLoading ? (
              <p className='text-center text-gray-500'>Memuat pesanan...</p>
            ) : reservations.length === 0 ? (
              <p className='text-center text-gray-500'>
                Anda belum memiliki pesanan.
              </p>
            ) : (
              <div className='space-y-6'>
                {reservations.map((res) => (
                  <div key={res.id} className='border rounded-lg p-4 shadow-sm'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between'>
                      <div>
                        <p className='text-lg font-bold text-gray-800'>
                          {res.name}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Pesanan pada:{' '}
                          {format(new Date(res.createdAt), 'dd MMMM yyyy', {
                            locale: id,
                          })}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Total Harga: {formatCurrency(res.price)}
                        </p>
                      </div>

                      <div className='mt-4 md:mt-0 md:text-right'>
                        <p
                          className={`font-semibold text-sm ${
                            res.status === 'LUNAS'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          Status: {res.status}
                        </p>
                        <p className='text-sm text-gray-600'>
                          Progres: {res.progress}
                        </p>

                        {/* Tombol Unggah hanya jika status belum lunas */}
                        {res.status === 'BELUM_LUNAS' && (
                          <div className='mt-2'>
                            {uploadingStatus[res.id] === 'uploading' ? (
                              <p className='text-sm text-blue-500 animate-pulse'>
                                Mengunggah...
                              </p>
                            ) : (
                              <label
                                htmlFor={`upload-proof-${res.id}`}
                                className='inline-block bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition'
                              >
                                Unggah Bukti Bayar
                                <input
                                  id={`upload-proof-${res.id}`}
                                  type='file'
                                  className='hidden'
                                  onChange={(e) =>
                                    handlePaymentProofUpload(
                                      res.id,
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </label>
                            )}
                          </div>
                        )}
                        {uploadingStatus[res.id] === 'success' && (
                          <p className='text-sm text-green-500 mt-2'>
                            Berhasil diunggah! Menunggu verifikasi.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Jika tidak ada sesi dan tidak dalam status loading, komponen tidak akan menampilkan apa-apa
  return null;
};

export default UserProfilePage;
